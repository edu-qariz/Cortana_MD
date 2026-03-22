/**
 * CORTANA MD - Shell Loader
 * Imports the updater and the NPM bot engine safely.
 */
const { execSync } = require('child_process');

console.log("[Auto-Updater] Checking if @cortana-md/engine is installed...");

try {
    // Check if we can resolve it
    require.resolve('@cortana-md/engine');
} catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
        console.log("⏳ Initial boot! Installing bot engine from NPM...");
        try {
            execSync(`npm install @cortana-md/engine@latest`, { stdio: 'inherit' });
            console.log("✅ Installation complete.");
        } catch (installErr) {
            console.error("❌ Failed to install bot engine:", installErr.message);
            process.exit(1);
        }
    } else {
        throw e;
    }
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
    const cortana = require('@cortana-md/engine');
    cortana.startHostedBot();
})();