const cron = require('cron');
const app = require('./app');
const config = require('./config.json');

const delayEnabled = config.schedule.delay.enabled;
const minDelay = config.schedule.delay.minDelay * 1000;
const maxDelay = config.schedule.delay.maxDelay * 1000;

log('Started the built-in scheduler. Script will now run according to the configured cron expression.');

var job = new cron.CronJob(config.schedule.cronExpression, () => {
    if (delayEnabled) {
        const delay = generateRandomDelay();
        console.log(`Waiting ${delay/1000} seconds...`);
        setTimeout(() => {
            runScript();
        }, delay);
    } else {
        runScript();
    }
}, null, true, config.schedule.timezone);

function runScript() {
    log('Running the script...');
    // app.bumpServer();
}

function log(message) {
    const now = new Date().toLocaleString();
    console.log(`[${now}] ${message}`);
}

function generateRandomDelay() {
    return Math.floor(Math.random() * (maxDelay - minDelay + 1) + minDelay);
}