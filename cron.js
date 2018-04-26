const cron = require('cron');
const app = require('./app');

var job = new cron.CronJob('* * * * * *', function () {
    console.log('You will see this message every second.');
    // app.bumpServer();
}, null, true, 'America/Los_Angeles');