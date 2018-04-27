const cron = require('cron');
const app = require('./app');
const config = require('./config.json');

console.log('Started running script with built-in scheduler.');

var job = new cron.CronJob(config.schedule.cronExpression, () => {
    console.log('You will see this message every second.');
    // app.bumpServer();
}, null, true, 'America/Los_Angeles');