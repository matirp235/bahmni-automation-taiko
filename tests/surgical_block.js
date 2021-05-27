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

step('Verify New Surgical Block button',async()=>{
    //Verify working of button and Go to Surgical block page
     await click(button("New Surgical Block"));

     //Verify Surgical block page
     await waitFor(2000);
     assert.ok(await text('Add new surgical block').exists());
})

step('Click on Save and Verify Saved message',async()=>{
  //Click on save
  await click("Save");

  //Verify message
  assert.ok(await text('Saved').exists());
  await waitFor(2000);
})

step('Adding new surgical block',async() =>{

     //Filling the "Add new surgical block" form
     await dropDown(below(text("Step 1 - Create surgical block"))).select({index:'2'});
     await click("OT 3"); 
     await timeField(toRightOf(text('Start Date-time'))).select(new Date('2021-05-30, 7:40 AM'));
     await timeField(toRightOf(text('End Date-time'))).select(new Date('2021-05-30, 7:40 PM'));
     await waitFor(2000);
     
   })

step('Adding new surgery',async() =>{
    
    //Move to the specific date
    await evaluate(() => document.getElementById('week-button').click());
    await scrollDown(locators.Details.surgeon1);
    await click(locators.Details.surgeon1);
    await waitFor(2000);

    //Editing the block and scheduling surgery
    await click(button("Edit"));
    await click(button("Add Surgery"));
    await write("IQ300",into(textBox({placeholder: locators.Details.patient_message})));
    await waitFor(1000);
    await click(locators.Details.patient1);
    await write("2",into(textBox({id:'estTimeHoursID'})));
    await waitFor(2000);
    await click(button("Add"));
    await waitFor(2000);
    
   })

   step('Edit the Surgical block',async() =>{

    //Move to the specific date
    await evaluate(() => document.getElementById('week-button').click());
    await scrollDown(locators.Details.surgeon1);
    await click(locators.Details.surgeon1);
    await waitFor(2000);

    //Editing the block and scheduling surgery
    await click(button("Edit"));

    //Verify Surgical block page
     await waitFor(2000);
     assert.ok(await text('Add new surgical block').exists());

     //Filling the "Add new surgical block" form
     await dropDown(below(text("Step 1 - Create surgical block"))).select({index:'2'});
     await waitFor(2000);
     await click("OT 2"); 
     //await timeField(toRightOf(text('Start Date-time'))).select(new Date(locators.Details.start_date_time));
     //await timeField(toRightOf(text('End Date-time'))).select(new Date(locators.Details.end_date_time));
     await waitFor(2000);


   })

   step('Postpone the surgical block',async() =>{
   
   //Move to the specific date
   await evaluate(() => document.getElementById('week-button').click());
   await scrollDown(locators.Details.surgeon2);
   await click(locators.Details.surgeon2);
   await waitFor(5000);

   //Postponing the surgery block
   await click(button("Cancel Block"));
   await waitFor(2000);
   await click("Postpone Block");
   await write("test postpone",into(textBox({placeholder: locators.Details.postpone_message})));
   await click(button("Confirm"));

   //Verify Postpone message
   await waitFor(1000);
   assert.ok(await text('Postponed surgeries for Dr.Dr Ali Al Ani and Dr Hanna Janho').exists());
   await waitFor(2000);

   })

   step('Cancel the surgical block',async() =>{
    
 
    //Move to the specific date
    await evaluate(() => document.getElementById('week-button').click());
    await scrollDown(locators.Details.surgeon3);
    await click(locators.Details.surgeon3);
    await waitFor(5000);
 
    //Postponing the surgery block
    await click(button("Cancel Block"));
    await waitFor(2000);
    await click("Cancel Block");
    await write("test cancel",into(textBox({placeholder: locators.Details.postpone_message})));
    await click(button("Confirm"));
 
    //Verify Postpone message
    await waitFor(1000);
    assert.ok(await text('Cancelled surgeries for Dr.Other Surgeon').exists());
    await waitFor(2000);
 
    })

    step('Move surgery to existing slot',async() =>{
      
      //Click on Surgery
      await click(text(locators.Details.patient2));

      await waitFor(3000);

      //Adding form details
      await click("Move");
      await timeField(toRightOf(text('Date:'))).select(new Date('2021-05-28'));
      await waitFor(1000);
      await dropDown(toRightOf(text("Destination Block:"))).select({index:'2'});
      await click("Move");

      //Verify error message
      await waitFor(2000);
      assert.ok(await text('[30006574 3000657A has conflicting appointment at OT 1 with Muthana AL-Rayyan]').exists());

    })

    step('Move surgery to non-existing slot',async() =>{
      
      //Click on Surgery
      await click(text(locators.Details.patient2));

      await waitFor(3000);

      //Adding form Details
      await click("Move");
      await timeField(toRightOf(text('Date:'))).select(new Date('2021-06-03'));
      await waitFor(2000);
      
      //Verify error message
      assert.ok(await text('No free time slots available for the selected date').exists());

    })

    