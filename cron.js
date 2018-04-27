const cron = require('cron');
const app = require('./app');
const config = require('./config.json');

var job = new cron.CronJob(config.schedule.cronExpression, () => {
    console.log('You will see this message every second.');
    // app.bumpServer();
}, null, true, 'America/Los_Angeles');