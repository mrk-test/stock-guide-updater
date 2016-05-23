var CronJob = require('cron').CronJob;
var stockGuideUpdater = require('./lib/stockGuideUpdater.js');

var job = new CronJob({
    cronTime: process.env.SG_CRON_SCHEDULE,
    onTick: performTask,
    start: false,
    timeZone: process.env.SG_CRON_TIMEZONE
});
job.start();

function performTask() {
    console.log('Stock Guide Updater starting...');
    stockGuideUpdater.updateStockGuide().then(function() {
        console.log('Stock Guide Updater completed...');
    });
}
