const cron = require('cron');
const app = require('./app');
const config = require('./config.json');

log('Started the built-in scheduler. Script will now run according to the configured cron expression.');

var job = new cron.CronJob(config.schedule.cronExpression, () => {
    log('Running the script...');
    // app.bumpServer();
}, null, true, config.schedule.timezone);

function log(message) {
    const now = new Date().toLocaleString();
    console.log(`[${now}] ${message}`);
}