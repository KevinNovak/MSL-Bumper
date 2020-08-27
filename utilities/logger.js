const timer = require('./timer');

function log(message) {
    console.log(`[${now()}] ${message}`);
}

function error(message) {
    console.error(`[${now()}] ${message}`);
}

function now() {
    return timer.format(new Date());
}

module.exports = {
    log,
    error,
};
