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


step('Verify_OT_list page',async() =>{
    await click("OT Scheduling");
    await evaluate(() => document.getElementById('list-view-button').click());
    assert.ok(await text ('Patient Name').exists());
    await waitFor(5000);
    await click("Completed")
    await waitFor(1000);
   // await click ("Edit")

    //await dropDown('Other Surgeon').select('Ali Al Ani')
    //await click ("Other Surgeon")
    //await dropDown('Other Surgeon').select({index:'0'});
    //await dropDown('Other Surgeon:').exists()
    //await click ("Add")
})

step ('Verify postponing feature',async() =>{
    await evaluate(() => document.getElementById('week-button').click());
    await click ("Scheduled");
    await click("Cancel")
    await click ("Postpone Surgery")
    await write("demo",into(textBox({placeholder: locators.Details.postpone_message})));
    await click ("Confirm")
})