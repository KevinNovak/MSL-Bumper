const puppeteer = require('puppeteer');
const timer = require('./utilities/timer');
const logger = require('./utilities/logger');
const urls = require('./data/urls.json');
const selectors = require('./data/selectors.json');
const config = require('./config.json');

const delaysEnabled = config.timings.delays.enabled;
const minDelay = config.timings.delays.min * 1000;
const maxDelay = config.timings.delays.max * 1000;
const descriptions = config.bump.descriptions.list;

// Browser options
const options = {
    headless: config.browser.hide
};

if (config.browser.custom.enabled) {
    options.executablePath = config.browser.custom.path;
}

async function bumpServer() {
    // Open browser
    logger.log('Opening browser...');
    const browser = await launchBrowser();
    browser.on('disconnected', async () => {
        logger.log('Browser disconnected.');
        exit();
    });

    const page = await browser.newPage();

    // Input username and password
    logger.log('Inputing username and password...');
    await page.goto(urls.base + urls.pages.login);
    await page.type(selectors.fields.username, config.account.username);
    await page.type(selectors.fields.password, config.account.password);
    await delay(page);

    // Login
    logger.log('Logging in...');
    await page.click(selectors.buttons.login);
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
    await page.goto(`${urls.base}${urls.pages.edit}?${urls.queries.serverId}=${config.account.serverId}`);

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

    // Set description
    if (config.bump.descriptions.enabled) {
        const description = getRandomDescription();
        await page.evaluate((description) => {
            document.getElementsByName('description')[0].value = description;
        }, description);
    }

    // Bump server
    if (config.bump.enabled) {
        logger.log('Bumping Server...');
        await page.evaluate(() => {
            saveServer();
        });
        await delay(page);
    }

    // Logout
    logger.log('Logging out...');
    await page.goto(urls.base + urls.pages.logout);

    // Close browser
    await closeBrowser(browser);
}

async function launchBrowser() {
    try {
        return await puppeteer.launch(options);
    } catch (error) {
        logger.error('Failed to launch browser. Please check if the executable path is correct or try headless mode.');
        exit();
    }
}

async function closeBrowser(browser) {
    logger.log('Closing browser...');
    await browser.close();
}

function getRandomDescription() {
    return descriptions[Math.floor(Math.random() * descriptions.length)];
}

async function delay(page) {
    if (delaysEnabled) {
        const delay = generateRandomDelay();
        const time = timer.format(timer.getTimeAfterMs(delay));
        logger.log(`Waiting ${delay/1000} seconds, until "${time}"...`);
        await page.waitFor(delay);
    }
}

function generateRandomDelay() {
    return Math.floor(Math.random() * (maxDelay - minDelay + 1) + minDelay);
}

function exit() {
    if (!module.parent) {
        process.exit();
    }
}

process.on('unhandledRejection', (reason, promise) => {
    console.error('Error: Unhandled rejection. Reason: ', reason);
    exit();
});

// Main function
if (!module.parent) {
    bumpServer();
}

module.exports = {
    bumpServer
};