const puppeteer = require('puppeteer');
const config = require('./config.json');

const randomDelaysEnabled = config.randomDelays.enabled;
const minDelay = config.randomDelays.minDelay * 1000;
const maxDelay = config.randomDelays.maxDelay * 1000;

const baseUrl = 'https://minecraft-server-list.com/';

async function bumpServer() {
    // Open browser
    console.log('Opening browser...');
    const browser = await puppeteer.launch({
        headless: config.hideBrowser
    });
    const page = await browser.newPage();

    // Input username and password
    console.log('Inputing username and password...');
    await page.goto(baseUrl + 'login/login.php');
    await page.type(`input[name='username']`, config.username);
    await page.type(`input[name='password']`, config.password);
    await delay(page);

    // Login
    console.log('Logging in...');
    await page.click(`[name='Submit']`);
    await page.waitForNavigation();
    await delay(page);

    // Nagivate to "Edit Server" page
    console.log('Navigating to "Edit Server" page...');
    await page.goto(baseUrl + `login/edit_server.php?server_id=${config.serverId}`);
    await delay(page);

    // Bump server
    if (config.bumpEnabled) {
        console.log('Bumping Server...');
        await page.evaluate(saveServer());
        await delay(page);
    }

    // Logout
    console.log('Logging out...');
    await page.goto(baseUrl + 'login/logout.php');
    await delay(page);

    // Close browser
    console.log('Closing browser...');
    await browser.close();
}

async function delay(page) {
    if (randomDelaysEnabled) {
        const delay = generateRandomDelay();
        console.log(`Waiting ${delay/1000} seconds.`);
        await page.waitFor(delay).then((result) => {
            console.log('Done waiting.');
        }).catch((error) => {
            console.error(error);
        });
    }
}

function generateRandomDelay() {
    return Math.floor(Math.random() * (maxDelay - minDelay + 1) + minDelay);
}

bumpServer();