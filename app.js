const puppeteer = require('puppeteer');
const timer = require('./timer');
const logger = require('./logger');
const config = require('./config.json');

const actionDelaysEnabled = config.actionDelays.enabled;
const minDelay = config.actionDelays.minDelay * 1000;
const maxDelay = config.actionDelays.maxDelay * 1000;

const baseUrl = 'https://minecraft-server-list.com/';

async function bumpServer() {
    // Open browser
    logger.log('Opening browser...');
    const browser = await puppeteer.launch({
        headless: config.hideBrowser
    });
    browser.on('disconnected', async () => {
        logger.log('Browser disconnected.');
        process.exit();
    });

    const page = await browser.newPage();

    // Input username and password
    logger.log('Inputing username and password...');
    await page.goto(baseUrl + 'login/login.php');
    await page.type(`input[name='username']`, config.username);
    await page.type(`input[name='password']`, config.password);
    await delay(page);

    // Login
    logger.log('Logging in...');
    await page.click(`[name='Submit']`);
    await page.waitForNavigation();

    // Check if login failed
    const url = await page.url();
    if (!url.includes('dashboard')) {
        logger.error('Login failed. Please check if the username and password are correct.');
        await closeBrowser(browser);
        return;
    }

    await delay(page);

    // Nagivate to "Edit Server" page
    logger.log('Navigating to "Edit Server" page...');
    await page.goto(baseUrl + `login/edit_server.php?server_id=${config.serverId}`);

    // Check if editing is allowed
    const success = await page.evaluate(() => {
        return document.getElementsByClassName('errormsg').length === 0;
    });
    if (!success) {
        logger.error('Editing failed. Please check if the server ID is correct.');
        await closeBrowser(browser);
        return;
    }

    await delay(page);

    // Bump server
    if (config.bumpEnabled) {
        logger.log('Bumping Server...');
        await page.evaluate(() => {
            saveServer();
        });
        await delay(page);
    }

    // Logout
    logger.log('Logging out...');
    await page.goto(baseUrl + 'login/logout.php');
    await delay(page);

    // Close browser
    await closeBrowser(browser);
}

async function closeBrowser(browser) {
    logger.log('Closing browser...');
    await browser.close();
}

async function delay(page) {
    if (actionDelaysEnabled) {
        const delay = generateRandomDelay();
        const time = timer.format(timer.getTimeAfterMs(delay));
        logger.log(`Waiting ${delay/1000} seconds, until "${time}"...`);
        await page.waitFor(delay);
    }
}

function generateRandomDelay() {
    return Math.floor(Math.random() * (maxDelay - minDelay + 1) + minDelay);
}

if (!module.parent) {
    bumpServer();
}

module.exports = {
    bumpServer
};

process.on('unhandledRejection', (reason, promise) => {
    console.error('Error: Unhandled rejection. Reason: ', reason);
});