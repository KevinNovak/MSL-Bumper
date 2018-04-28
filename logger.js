function log(message) {
    const now = new Date().toLocaleString();
    console.log(`[${now}] ${message}`);
}

module.exports = {
    log
};