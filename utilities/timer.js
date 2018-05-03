const moment = require('moment');

function format(time) {
    return moment(time).format('YYYY-MM-DD HH:mm:ss');
}

function getTimeAfterMs(delay, date = Date.now()) {
    return moment(date).add(delay, 'milliseconds').toDate();
}

module.exports = {
    format,
    getTimeAfterMs
};