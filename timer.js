function getTimeAfterMs(delay) {
   return new Date(Date.now() + delay);
}

module.exports = {
    getTimeAfterMs
};