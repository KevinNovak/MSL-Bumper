const schedule = require('node-schedule');
const app = require('./app');
const timer = require('./timer');
const logger = require('./logger');
const config = require('./config.json');

const delayEnabled = config.scheduler.delay.enabled;
const minDelay = config.scheduler.delay.minDelay * 1000;
const maxDelay = config.scheduler.delay.maxDelay * 1000;

var nextDelay = generateRandomDelay();

var job = schedule.scheduleJob(config.scheduler.cronExpression, () => {
    if (delayEnabled) {
        const delay = nextDelay;
        nextDelay = generateRandomDelay();
        setTimeout(() => {
            runScript();
        }, delay);
    } else {
        runScript();
    }
});

async function runScript() {
    logger.log('Running the script...');
    await app.bumpServer();
    logNextRun();
}

function generateRandomDelay() {
    return Math.floor(Math.random() * (maxDelay - minDelay + 1) + minDelay);
}

function logNextRun() {
    var nextInvocation = new Date(job.nextInvocation());
    var time = timer.format(timer.getTimeAfterMs(nextDelay, nextInvocation));
    logger.log(`The next run is scheduled for "${time}".`);
}

logger.log('Started the built-in scheduler.');
logNextRun();