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
    clear,
    timeField
} = require('taiko');
const assert = require("assert");
const locators = require('./locators');
const { setPriority } = require('os');
const headless = process.env.headless_chrome.toLowerCase() === 'true';



step('Click on List View',async() =>{
  await evaluate(() => document.getElementById('list-view-button').click());
  await waitFor(3000);
})
step('Click on Calendar',async() =>{
    await evaluate(() => document.getElementById('calendar-button').click());
})
step('Verification of calendar view',async()=>{
    assert.ok(await text(locators.ScheduleCalenderDetails.time).exists());
})
step('Selecting only OT 3',async()=>{

    await click(checkBox(toRightOf('OT 2')));
    await click(checkBox(toRightOf('OT 1')));

})
step('Enter Surgeon Name',async()=>{
    await write(locators.ScheduleCalenderDetails.surgeon1,into(textBox({placeholder: locators.ScheduleCalenderDetails.surgeonNamePlaceHolder})));
    await press('Enter')
})
step('Enter Patient Name',async()=>{
   await write(locators.ScheduleCalenderDetails.patient1ID,into(textBox({placeholder: locators.ScheduleCalenderDetails.PatientNamePlaceHolder})));
    await waitFor(1000);
    await click(locators.ScheduleCalenderDetails.Patient1NameID);
 
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

 assert.ok(await text(locators.ScheduleCalenderDetails.Patient1Name , below("Patient Name")).exists());
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
 step('Click on Move Button' , async() =>
{
    await click(button('Move'));
})
step('Verification of Move Popup' , async()=>
{

 assert.ok(await text("MOVING_KEY").exists());

 })

step('Clicking on surgery',async()=>
{
    await waitFor(3000)
await click(text(locators.ScheduleCalenderDetails.Patient2NameID));

})

//30037642 30037647 ( IQ1202 )
step('Clicking on Cancel Surgery',async()=>
{
    await waitFor(3000)
await click(button('Cancel Surgery'));
//await evaluate(() => document.getElementById('cancel-button').click());
})

step('Verification of Cancel Popup',async()=>
{

assert.ok(await text("Do you want to cancel the surgery or postpone it?").exists());
})
step('Clicking on Postpone Surgery Button',async()=>
{
//await click('Postpone Surgery');
await evaluate(() => document.getElementById('postpone-button').click());
})
step('Enter the reason for change',async()=>
{
await write("just checking",into(textBox({placeholder: 'enter reason'})));

})
step('Click on Confirm',async()=>
{
await click(button('Confirm'));
await waitFor(1000);
})
step('Enter Postpone Patient Name',async()=>{
    await write(locators.ScheduleCalenderDetails.patient2ID,into(textBox({placeholder: "Enter Patient ID/ Name"})));
     await waitFor(1000);
     await click('30037642 30037647 (IQ1202)');
 })

step('Enter Postpone status',async()=>
{
    await waitFor(3000)
    await write("POSTPONED",into(textBox({placeholder: "Enter Status"})));
    await press('Enter')
    await waitFor(3000)

})
step('Verification of Postponing the surgery',async()=>{
    assert.ok(await text("POSTPONED" , below("Status")).exists());
    await waitFor(3000)
})

step('Clicking on Cancel Surgery Button',async()=>
{
await evaluate(() => document.getElementById('cancel-button').click());
})

step('Clicking on Surgery which we want to cancel',async()=>
{
    await click(text('30030AB5 30030ABD ( IQ1090 )'));
})

step('Enter Cancel Patient Name',async()=>{
    await write("IQ1090",into(textBox({placeholder: "Enter Patient ID/ Name"})));
     await waitFor(1000);
     await click('30030AB5 30030ABD (IQ1090)'); 
 })
 step('Enter Cancel status',async()=>
{
    await waitFor(3000)
    await write("CANCELLED",into(textBox({placeholder: "Enter Status"})));
    await press('Enter')
    await waitFor(3000)

})
step('Verification of Cancelling the surgery',async()=>{
    assert.ok(await text("CANCELLED" , below("Status")).exists());
    await waitFor(3000)
})
step('Clicking on Surgery where we want to add actual time',async()=>
{
    await click(text('TEST Patient ( IQ1010 )'));
})

step('Click on add actual time',async()=>{
    await waitFor(3000)
    await click(button('Add Actual Time'));
})

step('Verification of add time Popup',async()=>
{
assert.ok(await text("Add Actual time for").exists());
})

step('Click on add in add time popup',async()=>{
    await waitFor(3000)
    await click(button('Add'));
})
step('Verification of adding actual time',async()=>{
    assert.ok(await text("Actual time added to TEST Patient ").exists());
    await waitFor(3000)
})

step('Verification of the Day View',async()=>{
    assert.ok(await text("27 May 2021, Thu").exists());
    await waitFor(3000)
})

step('Click on week Button',async()=>
{
    await evaluate(() => document.getElementById('week-button').click());
    await waitFor(2000)
})
step('Verification of the week View',async()=>{
    assert.ok(await text("23 May 2021, Sun to 29 May 2021, Sat").exists());
    await waitFor(2000)
})
// step('Click on next button',async()=>
// {
//   await waitFor(1000);
//     await evaluate(() => document.getElementsByClassName('calendar-day-navigation').click());
//   await waitFor(1000);
// })

step('Verification of the next day View',async()=>{
    assert.ok(await text("28 May 2021, Fri").exists());
    await waitFor(2000)
})

step('Entering the date in Move Popup', async()=>
{
 await timeField(below(text('MOVING_KEY IQ300 - 2FFFF788 2FFFF78E FROM_KEY Ashraf Bustanji - OT 3'))).select(new Date('2021-05-27'))
    await waitFor(1000);
})
step('Adding the destination block',async()=>{
    await waitFor(2000)
    //await click(dropDown('Destination Block:'))
    
   // await dropDown('Destination Block:').select({index:'1'});
   await dropDown(toRightOf(text('Destination Block'))).select({index:'1'})
    await waitFor(2000)
    //await click(text("Hanna Janoh"))
    ////select[@class='ng-touched ng-dirty ng-valid-parse ng-invalid ng-invalid-required']

})
step('Click on Move Button on move popup', async()=>
{
 await click(button("Move"))
    await waitFor(1000);
})

