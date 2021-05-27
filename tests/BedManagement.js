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
    button,
    $,
    into,
    textBox,
    evaluate,
    waitFor,
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
step("Bed Management",async()=>{
        await click("Bed Management");
        await click("Bed Management");
        await click("Rehabilitation Center");
        var total =  $('.floor-header').text();
        total.then(function (result){
            console.log(result)
        })

    //go to home page
    var btn = $(".back-btn")
    await click(btn);
});

step("Edit tags", async () =>{
    await click("Bed Management");
    await click("Bed Management");
    await click("Rehabilitation Center");
    await click('Rehabilitation Center (4th floor)');
    await click('408/2');
    await click('Edit');
    console.log(await button('Isolation', below('Dept: Rehabilitation Center')).isDisabled())

    if(await button('Isolation', below('Dept: Rehabilitation Center')).isDisabled()){

        var y = $('.remove-button');
        await waitFor(3000);
        await click(y);
    }
    else{
        await write('Isolation');
        await press('Enter');

    }
    await click('Update');
    var validation = text('Isolation',toLeftOf('Edit')).exists();
    await assert.ok(validation);
    var btn = $(".back-btn")
    await click(btn);
    //
});

step("Open List View", async () =>{
    await click("Bed Management");
    await click("Bed Management");
    await click('Kahramana');
    await click('Kahramana(1st floor)');
    var listView = $('.switch-bed-views');
    await click(listView);
    var btn = $(".back-btn");
    await click(btn);
    //
    // var print = waitFor($('.print-list'));
    // await click(print);
});

step("Check Patient", async() =>{
    await click("Bed Management");
    await click(link(below('Identifier')));

});