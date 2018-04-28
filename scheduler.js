const cron = require('cron');
const app = require('./app');
const timer = require('./timer');
const logger = require('./logger');
const config = require('./config.json');

const delayEnabled = config.scheduler.delay.enabled;
const minDelay = config.scheduler.delay.minDelay * 1000;
const maxDelay = config.scheduler.delay.maxDelay * 1000;

logger.log('Started the built-in scheduler. Script will now run according to the configured cron expression.');

var job = new cron.CronJob(config.scheduler.cronExpression, () => {
    if (delayEnabled) {
        const delay = generateRandomDelay();
        const time = timer.getTimeAfterMs(delay).toLocaleString();
        logger.log(`Waiting ${delay/1000} seconds, until "${time}"...`);
        setTimeout(() => {
            runScript();
        }, delay);
    } else {
        runScript();
    }
}, null, true, config.scheduler.timezone);

function runScript() {
    logger.log('Running the script...');
    app.bumpServer();
}

function generateRandomDelay() {
    return Math.floor(Math.random() * (maxDelay - minDelay + 1) + minDelay);
}