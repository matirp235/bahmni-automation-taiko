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
    timeField,
    scrollDown,
    waitFor
} = require('taiko');
const assert = require("assert");
const locators = require('./locators');
const { below } = require('taiko');
const { toRightOf } = require('taiko');
const headless = process.env.headless_chrome.toLowerCase() === 'true';


step('Adding new surgical block',async() =>{
    //Go to OT Scheduling Theatre
    await click("OT Scheduling");

    //Verify OT Scheduling Page
    await waitFor(2000);
    assert.ok(await text('Operation Theatre').exists());

     //Go to Surgical block page
     await click(button("New Surgical Block"));

     //Verify Surgical block page
     await waitFor(2000);
     assert.ok(await text('Add new surgical block').exists());

     //Filling the "Add new surgical block" form
     await dropDown(below(text("Step 1 - Create surgical block"))).select({index:'2'});
     await click("OT 3");
     await timeField(toRightOf(text('Start Date-time'))).select(new Date('2021-05-30, 7:40 AM'));
     await timeField(toRightOf(text('End Date-time'))).select(new Date('2021-05-30, 7:40 PM'));
     await waitFor(2000);

     //Click on save
     await click("Save");
     assert.ok(await text('Saved').exists());
     await waitFor(2000);
   })
   step('Adding new surgery',async() =>{
    //Go to OT Scheduling Theatre
    await click("OT Scheduling");

    //Verify OT Scheduling Page
    await waitFor(2000);
    assert.ok(await text('Operation Theatre').exists());

    //Move to the specific date
    await evaluate(() => document.getElementById('week-button').click());
    await scrollDown('Sufyan Al Qasab');
    await click("Sufyan Al Qasab");
    await waitFor(5000);

    //Editing the block and scheduling surgery
    await click(button("Edit"));
    await click(button("Add Surgery"));
    await write("IQ300",into(textBox({placeholder: "Enter Patient ID/ Name"})));
    await waitFor(1000);
    await click('3009C210 3009C215 ( IQ3004 )');
    await write("2",into(textBox({id:'estTimeHoursID'})));
    await waitFor(2000);
    await click(button("Add"));
    await waitFor(2000);
    await click(button("Save"));
    assert.ok(await text('Saved').exists());
    await waitFor(2000);
   })