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
    dropDown,
    button,
    waitFor
} = require('taiko');
const assert = require("assert");
const locators = require('./locators');
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({
        headless: headless , 
        args: ["--start-fullscreen"]
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


step('Login and Goto Operation Theatre Page',async() =>{
    //Goto Application
    await goto("******", {waitForStart:2000}); //Add URL


    //Enter Login Details
    await write("******",into(textBox({placeholder: locators.Details.Username})));  //Add username
    await write("******",into(textBox({placeholder: locators.Details.Password})));  //Add password
    await dropDown('Location').select({index:'3'});
    await waitFor(1000);
    await click(button("Login"));
    await waitFor(2000);

    //Verify Home Page
    assert.ok(await text('OPD').exists());
    await waitFor(2000);

    //Go to Operation Theatre
    await click("Operation Theatre");
    await waitFor(2000);
    
    //Verify OT Page
    //await waitFor(3000);
    assert.ok(await text('Surgical Queues').exists());
})

step('Goto OT Scheduling',async() =>{
    await click('OT Scheduling')

    //Verify OT Scheduling Page
    await waitFor(2000);
    assert.ok(await text('Operation Theatre').exists());
})