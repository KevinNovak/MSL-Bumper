const timer = require('./timer');

function log(message) {
    const now = timer.format(new Date());
    console.log(`[${now}] ${message}`);
}

module.exports = {
    log
};