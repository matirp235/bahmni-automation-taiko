/* globals gauge*/
"use strict";
const path = require('path');
const {
    openBrowser,
    write,
    closeBrowser,
    goto,
    press,
    screenshot,
    above,
    click,
    checkBox,
    listItem,
    toLeftOf,
    link,
    text,
    into,
    textBox,
    evaluate,
    below,
    dropDown
} = require('taiko');
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({
        headless: headless
    })
});

afterSuite(async () => {
    await closeBrowser();
});

// Return a screenshot file name
gauge.customScreenshotWriter = async function () {
    const screenshotFilePath = path.join(process.env['gauge_screenshots_dir'],
        `screenshot-${process.hrtime.bigint()}.png`);

    await screenshot({
        path: screenshotFilePath
    });
    return path.basename(screenshotFilePath);
};

step("Goto Website",async()=>{
    await goto("https://qa-amman.ehealthunit.org/bahmni/home/index.html#/login");
});
step("Enter valid Username, Password and Location", async () => {
    await write('superman', into(textBox("Username"),{force:true}));
    await write('Admin123', into(textBox("Password"),{force:true}));
    await dropDown('Location').select('OPD');
});

step("Click on Login button", async () => {
    await click("Login", below("Location"));
});
