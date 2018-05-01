# MSL Bumper

Auto-bump your Minecraft server on [minecraft-server-list.com](http://minecraft-server-list.com/).

## Requirements

* Node.js
  * [Install files can be found here](https://nodejs.org/en/download/).
* Git
  * [Install files can be found here](https://git-scm.com/downloads).

## Getting Started

1. Clone this repository.
    * Run ```git clone https://github.com/KevinNovak/MSL-Bumper.git```.
2. Navigate to the cloned repository and install the required packages.
    * Run ```npm install```.
3. Modify ```config.json```.
    * See the [Configuration](https://github.com/KevinNovak/MSL-Bumper#configuration) section.
    * ***Important***: Remember to modify at least ```username```, ```password```, and ```serverId```.
4. Start with ```npm start```.

## Running on a Schedule

There are 3 main ways you can run this script on a schedule:

1. Built-in scheduler:
    * Simply run ```npm run scheduler```.
    * The **recommended** and probably easiest method.
    * Commands:
        * View logs with ```pm2 logs msl-bumper```.
        * Restart with ```pm2 restart msl-bumper```.
        * Stop with ```pm2 stop msl-bumper```.
        * Remove with ```pm2 delete msl-bumper```.
2. Running the Node.js script through a custom scheduler:
    * Setup a custom scheduler of your choice to run ```node app.js``` or ```npm start```.
    * Some helpful resources:
        * Windows: [Run a Node script with Windows task scheduler](https://eddyerburgh.me/run-a-node-script-with-windows-task-scheduler)
        * Mac & Linux: [How to Run Node.js Scripts from a Cron Job](https://askmacgyver.com/blog/tutorial/how-to-run-node-scripts-from-a-cron-job)
3. Running the shell script through a custom scheduler:
    * Setup a custom scheduler of your choice to run the ```bump.sh``` script.
    * Simply runs the Node.js script inside a shell script wrapper.
    * Some helpful resources:
        * Windows: [Execute Bash Script (Using Git Bash) from Windows Task Scheduler](https://gist.github.com/damc-dev/eb5e1aef001eef78c0f4)
        * Mac: [How to Run a Shell Script Every Day on a Mac](https://www.dssw.co.uk/blog/2011-05-22-how-to-run-a-shell-script-every-day-on-a-mac/)
        * Mac & Linux: [Schedule Tasks on Linux Using Crontab](https://kvz.io/blog/2007/07/29/schedule-tasks-on-linux-using-crontab/)

## Configuration

* **bumpEnabled**:
  * Actually bump the server?
      * If ```false```, will run all actions except the actual bump, useful for testing.
* **hideBrowser**:
  * Should the browser window be hidden?
  * ***NOTE***: Set to ```false``` if running from SSH or a non-GUI OS like Debian or Raspbian Lite.
* **username**:
  * Your **minecraft-server-list.com** username.
* **password**:
  * Your **minecraft-server-list.com** password.
* **serverId**:
  * Your **minecraft-server-list.com** server ID.
  * This can be found in the URL of your servers page on **minecraft-server-list.com**.
    * For example, your servers page URL might be ```http://minecraft-server-list.com/server/123456/```.
      * In this example ```"123456"``` is the server ID.
* **actionDelays**:
  * **enabled**:
    * Whether or not this script should wait a random amount of time between actions.
    * Recommended to leave enabled.
  * **minDelay**:
    * The minimum amount of time in seconds to wait.
  * **maxDelay**:
    * The maximum amount of time in seconds to wait.
* **scheduler**:
  * **cronExpression**:
    * Defines when the bump script should be ran.
    * [You can read about cron expressions here](http://www.quartz-scheduler.org/documentation/quartz-2.x/tutorials/crontrigger.html)
    * [Here are some examples and a cron generator](https://www.freeformatter.com/cron-expression-generator-quartz.html).
    * ***NOTE***: Does not support every format. See [this page](https://github.com/harrisiirak/cron-parser#supported-format) for details.
    * Defaults to every day at 9am, 3pm, and 9pm.
      * With a 0 to 2 hour delay, see ```delay``` below.
  * **delay**:
    * **enabled**:
      * Whether or not to wait a random amount of time after the scheduled time comes.
      * Recommended to leave enabled.
    * **minDelay**:
      * The minimum amount of time in seconds to wait.
    * **maxDelay**:
      * The maximum amount of time in seconds to wait.
    * ***NOTE***: Should be less than how often the script is running according to the ```cronExpression```.
* **customChrome**:
  * **enabled**:
    * Whether or not to use your own version of Chrome from the provided path.
  * **path**:
    * The path to the Chrome or Chromium executable to use if enabled above.
    * See [this page](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions) for more details.

## Disclaimer

Running automated scripts like this one is often against a websites terms and conditions. Ultimately you are the one responsible for knowing the terms and conditions, and for what you do with this script. Run at your own risk.

## References

* [Puppeteer](https://developers.google.com/web/tools/puppeteer/) by [Google](https://developers.google.com/) - Automate browser tasks in Chrome or Chromium.
* [Node Schedule](https://github.com/node-schedule/node-schedule) by [Tejas Manohar](https://tejas.io/) & [Santiago Gimeno](https://github.com/santigimeno) - Schedule jobs to run with Node.js.