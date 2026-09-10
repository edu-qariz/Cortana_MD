/**
 * CORTANA MD - Shell Loader
 * Ensures the bot engine AND its runtime deps are installed, then boots it.
 */
const path = require('path');
const { execSync } = require('child_process');

const ENGINE = 'cortana-md-engine';

// Modules the engine requires at load time. If any is missing the engine dies
// with MODULE_NOT_FOUND (e.g. "Cannot find module '@whiskeysockets/baileys'"),
// so check them all — not just the engine package itself.
const REQUIRED_MODULES = [
    ENGINE,
    '@whiskeysockets/baileys'
];

const searchPaths = [
    process.cwd(),
    path.join(process.cwd(), 'node_modules', ENGINE)
];

function missingModules() {
    return REQUIRED_MODULES.filter((mod) => {
        try {
            require.resolve(mod, { paths: searchPaths });
            return false;
        } catch (e) {
            return true;
        }
    });
}

let missing = missingModules();

if (missing.length > 0) {
    console.log(`[Auto-Updater] Missing: ${missing.join(', ')}`);
    console.log("⏳ Installing bot engine + dependencies from NPM...");
    try {
        // --legacy-peer-deps matches the panel/Pterodactyl install flags and
        // avoids ERESOLVE failures from baileys' optional peer dependencies.
        execSync(`npm install ${ENGINE}@latest --legacy-peer-deps --no-audit --no-fund`, { stdio: 'inherit' });
        console.log("✅ Installation complete.");
    } catch (installErr) {
        console.error("❌ Failed to install bot engine:", installErr.message);
        process.exit(1);
    }

    missing = missingModules();
    if (missing.length > 0) {
        console.error(`❌ Still missing after install: ${missing.join(', ')}`);
        console.error("   Fix: delete the node_modules folder (or set FORCE_REBUILD=1) and restart.");
        process.exit(1);
    }
} else {
    console.log("[Auto-Updater] Bot engine is installed.");
}

// 1. Start the Auto Updater Background Task (Awaited for first boot check)
const { checkForUpdates } = require('./auto-updater');

(async () => {
    try {
        await checkForUpdates();
    } catch (e) {
        console.error("[Auto-Updater] Failed to check for updates:", e.message);
    }
    
    // 2. Load the engine and start the bot ONLY AFTER update check completes
    const cortana = require(ENGINE);
    cortana.startHostedBot();
})();