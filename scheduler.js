const schedule = require('node-schedule');
const app = require('./app');
const timer = require('./utilities/timer');
const logger = require('./utilities/logger');
const config = require('./config.json');

const offsetEnabled = config.timings.scheduler.offset.enabled;
const minOffset = config.timings.scheduler.offset.min * 1000;
const maxOffset = config.timings.scheduler.offset.max * 1000;

var nextOffset = generateRandomOffset();

var job = schedule.scheduleJob(config.timings.scheduler.expression, () => {
    if (offsetEnabled) {
        const offset = nextOffset;
        nextOffset = generateRandomOffset();
        setTimeout(() => {
            runScript();
        }, offset);
    } else {
        runScript();
    }
});

async function runScript() {
    logger.log('Running the script...');
    await app.bumpServer();
    logNextRun();
}

function generateRandomOffset() {
    return Math.floor(Math.random() * (maxOffset - minOffset + 1) + minOffset);
}

function logNextRun() {
    var nextInvocation = new Date(job.nextInvocation());
    var time = timer.format(timer.getTimeAfterMs(nextOffset, nextInvocation));
    logger.log(`The next run is scheduled for "${time}".`);
}

logger.log('Started the built-in scheduler.');
logNextRun();
