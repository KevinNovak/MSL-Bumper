# MSL Bumper
### Auto-bump your Minecraft server on [minecraft-server-list.com](http://minecraft-server-list.com/).

## Requirements
* Node.js
    * [Install files can be found here](https://nodejs.org/en/download/).
* Git

## Getting Started
1. Clone this repository:
    * Run ```git clone https://github.com/KevinNovak/MSL-Bumper.git```.
2. Navigate to the cloned repository and install the required packages.
    * Run ```npm install```.
2. Modify ```config.json```:
    * **bumpEnabled**:
        * Actually bump the server?
            * Set to "true" or "false".
            * Set to "false" if you want to do a test run.
            * Set to "true" if you want to bump your server.
    * **hideBrowser**:
        * Should the browser be hidden?
            * Set to "true" or "false".
            * If "true", no browser window will appear when ran.
    * **username**:
        * Your minecraft-server-list.com username.
    * **password**:
        * Your minecraft-server-list.com password.
    * **serverId**:
        * Your minecraft-server-list.com server ID.
        * This can be found in the URL of your servers page on minecraft-server-list.com.
            *  For example, your servers page URL might be "http://minecraft-server-list.com/server/123456/".
                * In this example "**123456**" is the server ID.
    * **randomDelays**:
        * **enabled**:
            * Whether or not this script should wait a random amount of time between actions.
                * Set to "true" or "false".
            * For example, waiting X seconds after logging in.
            * Recommended to leave enabled.
        * **minDelay**:
            * The minimum amount of time in seconds to wait.
        * **maxDelay**:
            * The maximum amount of time in seconds to wait.
3. Start with ```npm start```

## References
* [Puppeteer](https://developers.google.com/web/tools/puppeteer/) by [Google](https://developers.google.com/) - Automate browser tasks in Chrome or Chromium.