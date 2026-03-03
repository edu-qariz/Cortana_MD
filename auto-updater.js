/**
 * CORTANA MD - Auto Updater & Dependency Checker
 * 
 * This script ensures the bot is always running the latest version from NPM.
 * It also handles automatic installation if node_modules is deleted.
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const PKG_NAME = '@depro-tech/cortana-md';
const CHECK_INTERVAL = 60 * 1000; // 60 seconds

function log(msg) {
    console.log(`[Auto-Updater] ${msg}`);
}

function getInstalledVersion() {
    try {
        const pkgPath = path.join(process.cwd(), 'node_modules', PKG_NAME, 'package.json');
        if (fs.existsSync(pkgPath)) {
            const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
            return pkg.version;
        }
    } catch (e) { }
    return null;
}

async function getLatestVersion() {
    try {
        const res = await fetch(`https://registry.npmjs.org/${encodeURIComponent(PKG_NAME)}/latest`);
        const data = await res.json();
        return data.version;
    } catch (e) {
        return null;
    }
}

async function checkForUpdates() {
    const currentVersion = getInstalledVersion();

    // 1. Fallback: If node_modules is missing entirely, force an install
    if (!currentVersion) {
        log("🔄 Cortana MD package not found in node_modules! Installing now...");
        try {
            execSync(`npm install`, { cwd: process.cwd(), stdio: 'inherit' });
            log("✅ Installation complete. Restarting bot...");
            process.exit(1); // Exit with 1 so Pterodactyl/PM2 auto-restarts the "crashed" process
        } catch (e) {
            log(`❌ Failed to install dependencies: ${e.message}`);
        }
        return;
    }

    // 2. Normal Update Check
    const latestVersion = await getLatestVersion();
    if (!latestVersion) return; // NPM might be unreachable

    if (currentVersion !== latestVersion) {
        log(`✨ New version found! (${currentVersion} → ${latestVersion})`);
        log("📥 Downloading update...");
        try {
            execSync(`npm install ${PKG_NAME}@latest`, { cwd: process.cwd(), stdio: 'inherit' });
            log("✅ Update complete! Restarting to apply changes...");
            process.exit(1); // Exit with 1 so Pterodactyl/PM2 auto-restarts the "crashed" process
        } catch (e) {
            console.error(`❌ Update failed:`, e.message);
        }
    }
}

// Initial check on boot
log("Checking for updates...");
checkForUpdates();

// Continuous check every 60 seconds
setInterval(checkForUpdates, CHECK_INTERVAL);