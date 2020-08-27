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
var browserOptions = {
    headless: config.browser.hide,
};

if (config.browser.custom.enabled) {
    browserOptions.executablePath = config.browser.custom.path;
}

var typingOptions = {};
if (config.timings.typingDelays.enabled) {
    typingOptions.delay = config.timings.typingDelays.delay;
}

async function bumpServer() {
    // Open browser
    logger.log('Opening browser...');
    const browser = await launchBrowser();
    const page = await browser.newPage();

    // Input username and password
    logger.log('Inputing username and password...');
    await page.goto(urls.base + urls.pages.login);
    await page.type(selectors.fields.username, config.account.username, typingOptions);
    await page.type(selectors.fields.password, config.account.password, typingOptions);
    await delay(page);

    // Login
    logger.log('Logging in...');
    await page.click(selectors.buttons.login);
    try {
        await page.waitForSelector(selectors.indicators.dashboard);
    } catch (error) {
        logger.error('Login failed. Please check if the username and password are correct.');
        await closeBrowser(browser);
        return;
    }

    await delay(page);

    // Nagivate to "Edit Server" page
    logger.log('Navigating to "Edit Server" page...');
    await page.goto(
        `${urls.base}${urls.pages.edit}?${urls.queries.serverId}=${config.account.serverId}`
    );

    // Check if editing is allowed
    const selector = selectors.error;
    const success = await page.evaluate(selector => {
        return document.querySelectorAll(selector).length === 0;
    }, selector);

    if (!success) {
        logger.error('Editing failed. Please check if the server ID is correct.');
        await closeBrowser(browser);
        return;
    }

    await delay(page);

    // Set description
    if (config.bump.descriptions.enabled) {
        const selector = selectors.fields.description;
        const description = getRandomDescription();
        await page.evaluate(
            ({ selector, description }) => {
                document.querySelector(selector).value = description;
            },
            {
                selector,
                description,
            }
        );
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
        const browser = await puppeteer.launch(browserOptions);
        browser.on('disconnected', async () => {
            logger.log('Browser disconnected.');
            exit();
        });
        return browser;
    } catch (error) {
        logger.error(
            'Failed to launch browser. Please check if the executable path is correct or try changing the browser hide option.'
        );
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
        logger.log(`Waiting ${delay / 1000} seconds, until "${time}"...`);
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
    bumpServer,
};
