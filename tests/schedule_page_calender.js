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
    waitFor,
    toRightOf,
    below,
    mouseAction,
    near,
    clear
} = require('taiko');
const assert = require("assert");
const locators = require('./locators');
const { setPriority } = require('os');
const headless = process.env.headless_chrome.toLowerCase() === 'true';


step('Goto OT Scheduling',async() =>{
    await click('OT Scheduling')
})
step('Click on List View',async() =>{
    await waitFor(2000);
  
  await evaluate(() => document.getElementById('list-view-button').click());

  await waitFor(3000);
  
})
step('Click on Calendar',async() =>{
    await evaluate(() => document.getElementById('calendar-button').click());
})
step('Verification of calendar view',async()=>{
    assert.ok(await text('10:00 am').exists());
})
step('Selecting only OT 3',async()=>{

    await click(checkBox(toRightOf('OT 2')));
    await click(checkBox(toRightOf('OT 1')));

})
step('Enter Surgeon Name',async()=>{
    await write("Ashraf Bustanji",into(textBox({placeholder: "Enter Surgeon Name"})));
    await press('Enter')
})
step('Enter Patient Name',async()=>{
   await write("IQ300",into(textBox({placeholder: "Enter Patient ID/ Name"})));
    await waitFor(1000);
    await click('2FFFF788 2FFFF78E (IQ300)');
 
})
step('Enter Status',async()=>
{
    await waitFor(3000)
    await write("SCHEDULED",into(textBox({placeholder: "Enter Status"})));
    await press('Enter')
    await waitFor(3000)

})
 step('Verification of Filter Functionality' , async()=>
{

 assert.ok(await text("2FFFF788 2FFFF78E " , below("Patient Name")).exists());
assert.equal(await text("22FFFF87A 2FFFF87F ").exists(0,0),false)

 }
 )
step('Clicking on the surgery',async()=>
{

await click(text('2FFFF788 2FFFF78E ( IQ300 )'));
await waitFor(3000);
})
step('Verification of Edit Popup', async()=>
{
    assert.ok(await text('Surgical Appointment Details').exists())
})
step('Clicking on Edit Button', async()=>
{
    await click(button('Edit'));
})
step('Edit Details',async()=>
{
  //  await write("Changing the procedure",into(textBox),toLeftOf('Surgical Assistant'));
    //await write(textBox("Changing the procedure", toRightOf("Procedure(s)")))
  // await dropDown('Other Surgeon').select('Hannah Janho');
  //  await dropDown({id:'otherSurgeon as otherSurgeon.person.display for otherSurgeon in otherSurgeons track by otherSurgeon.uuid'}).select('Hanna Janho')
 // await click(text('Ali Al Ani'), toRightOf('Other Surgeon'), near('Surgical Assistant'));
 // await click('Hannah Janho');
// await write("Notes",into(textBox({placeholder: 'enter your notes'})));
 await clear(textBox({placeholder:'enter your notes'}))
 await write("Notes",into(textBox({placeholder: 'enter your notes'})));

})
step('Click on Add Button' , async() =>
{
    await click(button('Add'));
})
step('Click on Save Button' , async() =>
{
    await click(button('Save'));
})
step('Verification of Editing the surgery' , async()=>
{

 assert.ok(await text("Notes" , below("Notes")).exists());

 }
 )