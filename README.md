# MSL Bumper
### Auto-bump your Minecraft server on [minecraft-server-list.com](http://minecraft-server-list.com/).

## Requirements
* Node.js
    * [Install files can be found here](https://nodejs.org/en/download/).
* Git
    * [Install files can be found here](https://git-scm.com/downloads).

## Getting Started
1. Clone this repository:
    * Run ```git clone https://github.com/KevinNovak/MSL-Bumper.git```.
2. Navigate to the cloned repository and install the required packages.
    * Run ```npm install```.
2. Modify ```config.json```:
    * **bumpEnabled**:
        * Actually bump the server?
            * Set to ```true``` or ```false```.
                * If ```false```, will run all actions except the actual bump, useful for testing.
    * **hideBrowser**:
        * Should the browser window be hidden?
            * Set to ```true``` or ```false```.
    * **username**:
        * Your **minecraft-server-list.com** username.
    * **password**:
        * Your **minecraft-server-list.com** password.
    * **serverId**:
        * Your **minecraft-server-list.com** server ID.
        * This can be found in the URL of your servers page on **minecraft-server-list.com**.
            *  For example, your servers page URL might be ```http://minecraft-server-list.com/server/123456/```.
                * In this example ```"123456"``` is the server ID.
    * **randomDelays**:
        * **enabled**:
            * Whether or not this script should wait a random amount of time between actions.
                * Set to ```true``` or ```false```.
            * Recommended to leave enabled.
        * **minDelay**:
            * The minimum amount of time in seconds to wait.
        * **maxDelay**:
            * The maximum amount of time in seconds to wait.
3. Start with ```npm start```

## Disclaimer
Running automated scripts like this one is often against a websites terms and conditions. Ultimately you are the one responsible for knowing the terms and conditions, and for what you do with this script. Run at your own risk.

## References
* [Puppeteer](https://developers.google.com/web/tools/puppeteer/) by [Google](https://developers.google.com/) - Automate browser tasks in Chrome or Chromium.