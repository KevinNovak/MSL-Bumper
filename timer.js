const moment = require('moment');

function format(time) {
    return moment(time).format('YYYY-MM-DD HH:mm:ss');
}

function getTimeAfterMs(delay) {
    return new Date(Date.now() + delay);
}


module.exports = {
    format,
    getTimeAfterMs
};