const schedule = require('node-schedule');
const app = require('./app');
const timer = require('./timer');
const logger = require('./logger');
const config = require('./config.json');

const delayEnabled = config.scheduler.delay.enabled;
const minDelay = config.scheduler.delay.minDelay * 1000;
const maxDelay = config.scheduler.delay.maxDelay * 1000;

var job = schedule.scheduleJob(config.scheduler.cronExpression, () => {
    if (delayEnabled) {
        const delay = generateRandomDelay();
        const time = timer.format(timer.getTimeAfterMs(delay));
        logger.log(`Waiting ${delay/1000} seconds, until "${time}"...`);
        setTimeout(() => {
            runScript();
        }, delay);
    } else {
        runScript();
    }
});

function runScript() {
    logger.log('Running the script...');
    app.bumpServer();
}

function generateRandomDelay() {
    return Math.floor(Math.random() * (maxDelay - minDelay + 1) + minDelay);
}

var time = timer.format(new Date(job.nextInvocation()));
logger.log('Started the built-in scheduler. Script will now run according to the configured cron expression.');
logger.log(`The next run is scheduled for "${time}".`);
logger.log('NOTE: If schedule delays are enabled, delays will not start until the above time.');