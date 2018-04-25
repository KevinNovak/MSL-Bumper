const puppeteer = require('puppeteer');
const config = require('./config.json');

const randomDelaysEnabled = config.randomDelays.enabled;
const minDelay = config.randomDelays.minDelay * 1000;
const maxDelay = config.randomDelays.maxDelay * 1000;

async function bumpServer() {
    // Open browser
    const browser = await puppeteer.launch({
        headless: config.hideBrowser
    });
    const page = await browser.newPage();

    // Login
    await page.goto('https://minecraft-server-list.com/login/login.php');
    await page.type(`input[name='username']`, config.username);
    await page.type(`input[name='password']`, config.password);
    await delay(page);
    await page.click(`[name='Submit']`);
    await page.waitForNavigation();
    await delay(page);

    // Bump server
    await page.goto(`http://minecraft-server-list.com/login/edit_server.php?server_id=${config.serverId}`);
    await delay(page);
    if (config.bumpEnabled) {
        await page.evaluate(saveServer());
        await delay(page);
    }

    // Logout
    await page.goto('https://minecraft-server-list.com/login/logout.php');

    // Close browser
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