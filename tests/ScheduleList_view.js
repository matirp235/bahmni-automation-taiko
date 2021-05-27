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
    below,
    click,
    clear,
    checkBox,
    listItem,
    toLeftOf,
    link,
    text,
    into,
    near,
    textBox,
    timeField,
    evaluate,
    dropDown,
    button,
    waitFor
} = require('taiko');
const assert = require("assert");
const locators = require('./locators');
const { toRightOf } = require('taiko');
const headless = process.env.headless_chrome.toLowerCase() === 'true';

step('Goto OT Scheduling Page',async()=>{

    await click("OT Scheduling")
    await evaluate(() => document.getElementById('week-button').click());

})
step('Verify Edit OT feature in List View',async() =>{
    
    await evaluate(() => document.getElementById('list-view-button').click());
    assert.ok(await text ('Patient Name').exists());
    await waitFor(5000);
    await click("Completed")
    await waitFor(1000);
    await click ("Edit")

    //DropDown Code not working
    // await dropDown('Other Surgeon').select('Ali Al Ani')
    // await click ("Other Surgeon")
    // await dropDown('Other Surgeon').select({index:'0'});
    
    //Clicking and selecting other surgeon not working
    // await click("Select Surgeon")
    // await click("Ali Al Ani")
    // await click ("Add")
    await clear(textBox({placeholder:'enter your notes'}))
    await write("Other Surgeon Not Available",into(textBox({placeholder: 'enter your notes'})));
    await click ("Add")
    await click ("Save")
    assert.ok()

})

step ('Verify postponing feature',async() =>{
    //await evaluate(() => document.getElementById('week-button').click());
    await click("Scheduled");
    await click(button("Cancel"))
    await waitFor(3000) 
    await click("Postpone Surgery")
    await write("demo",into(textBox({placeholder: locators.ListView.postpone_message})));
    await click("Confirm")
})

step ('Verify Cancelling Feature',async() =>{
    //await evaluate(() => document.getElementById('week-button').click());
    await click("Scheduled");
    await click(button("Cancel"))
    await waitFor(3000) 
    await click("Cancel Surgery")
    await write("demo",into(textBox({placeholder: locators.ListView.cancel_message})));
    await click("Confirm")
})

step("Verify the Move feature of OT",async() =>{
    
  
    //await evaluate(() => document.getElementById('week-button').click());
    //Entering an 'Iddentifier' of a Scheduled OT that needs to be moved
    await click ("Scheduled")
    await waitFor(5000)
    await click(button("Move"))
    
    await waitFor(3000) 
    //await timeField(below(text('MOVING_KEY IQ1202 - 30037642 30037647 FROM_KEY Ashraf Bustanji - OT 3'))).select(new Date('2021-06-01'))
    await timeField(toRightOf(text('Date'))).select(new Date('2021-05-28'))
    
    
    await dropDown(toRightOf(text('Destination Block'))).select({index:'1'})

    await click("Move") 
    await waitFor(5000) 

    //await click(button("Move"))



})

// step("Verify Print Icon in List View",async() =>{
//     var attribute = await evaluate(("fa fa-print"), 
//     (element) => element.getAttribute("class"));

  
// })

// step("Verify the Add Actual Time feature of OT",async() =>{


// })
