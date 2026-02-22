/**
 * CORTANA MD - Shell Loader
 * Imports the updater and the NPM bot engine safely.
 */

// 1. Start the Auto Updater
require('./auto-updater');

// 2. Try loading the engine
try {
    const cortana = require('@depro-tech/cortana-md');
    // If it successfully loads, start the bot!
    cortana.startHostedBot();
} catch (error) {
    if (error.code === 'MODULE_NOT_FOUND' && error.message.includes('@depro-tech/cortana-md')) {
        console.log("⏳ Waiting for auto-updater to install the bot engine...");
        // The process stays alive because auto-updater.js has active intervals/timeouts
    } else {
        // If it's a different error (like a syntax error or a missing internal dependency), throw it
        throw error;
    }
}