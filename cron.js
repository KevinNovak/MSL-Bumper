const cron = require('cron');
const app = require('./app');
const config = require('./config.json');

console.log('Started the built-in scheduler. Script will now run according to the configured cron expression.');

var job = new cron.CronJob(config.schedule.cronExpression, () => {
    console.log('Running the script...');
    // app.bumpServer();
}, null, true, config.schedule.timezone);