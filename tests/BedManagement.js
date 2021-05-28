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
    toRightOf,
    timeField,
    openTab,
    switchTo,
    click,
    toLeftOf,
    link,
    text,
    button,
    $,
    into,
    textBox,
    waitFor,
    below,
    dropDown,
    above
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
    //Goto Website
    await goto("******", {waitForStart:2000});
});
step("Enter valid Username, Password and Location", async () => {
    await write('********', into(textBox({placeholder: localStorage.Details.Username}))); //Enter Username
    await write('********', into(textBox({placeholder: localStorage.Details.Password}))); //Enter password
    await dropDown('Location').select({index: '3'});//Providing Location
});

step("Click on Login button", async () => {
    await click("Login", below("Location"));//Clicking on Login Button
});

step("Bed Management",async()=>{
        await click("Bed Management");
        await click("Bed Management");
        await click("Rehabilitation Center");
        var total =  $('.floor-header').text();
        total.then(function (result){
            console.log(result)
        })
    var btn = $(".back-btn")
    await click(btn);
});

step("Bed Status", async function() {
    await click("Bed Management");
    await click("Bed Management");
    await click(button("Ward",below("Ward View")));
    await click("Ward (2nd floor) ( 37 )");
    await click("Kahramana");
    await click("Kahramana(1st floor) ( 5 )");
    await click("Rehabilitation Center");
    await click("Rehabilitation Center (4th floor) ( 38 )");
    await click("406/2");
    var x = $("//*[@id='bedManagement']/div/div[2]/p[4]/span").text();
    x.then(function(result) {
        if(result=='AVAILABLE'){
            console.log("validation successful - ",result);
            console.log("Bed not occupied, no date of discharge present")
        }
        else{
            console.log("validation failed")
        }
    })
    await click("405");
    var y = $("//*[@id='bedManagement']/div/div[2]/p[4]/span").text();
    y.then(function(result) {
        if(result=='OCCUPIED'){
            assert.ok(text('IQ3980',toLeftOf('Ward View')).exists());
            assert.ok(text('00',toLeftOf('Ward View')).exists());
            assert.ok(text('Expected Date of Discharge',toLeftOf('Ward View')).exists());
            console.log("validation successful - ",result);
        }
        else{
            console.log("validation failed")
        }
})

var btn = $(".back-btn");
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
});

step("Check Patient", async() =>{
    await click("Bed Management");
    await click(link(below('Identifier')));
    const AdmitButton = await button('Admit').isDisabled();
    const dischargeButton = button('Discharge',toRightOf(text('Transfer',below('Reason for Change in EDD')))).isVisible();

    if(AdmitButton){
        console.log("Validation Successful")
    }
    else {
        console.log("Validation Unsuccessful")
    }

    if(dischargeButton){
        console.log("Discharge button is enabled. Validation successful")
    }
    else{
        console.log("Validation Unsuccessful")
    }
    await waitFor(3000);
    var btn = $(".back-btn");
    await click(btn);
});

step("Move/Discharge Patient", async() =>{
    await click("Bed Management");
    await waitFor(3000);
    await click(link('Movement/Discharge',toRightOf('IQ1123')));
    await waitFor(3000);
    assert.ok(text('IQ',toLeftOf('Ward View')).exists());
    assert.ok(text('00',toLeftOf('Ward View')).exists());
    assert.ok(text('Expected Date of Discharge',toLeftOf('Ward View')).exists());
    var btn = $(".back-btn");
    await click(btn);
});

step("Click on Bed Management",async() =>{
    var name = "Demo Pat";
    var disposition_type="Admit to RC";
    await click("Bed Management");//Click on Bed Management
    await click(disposition_type);//Click on Disposition Type
    await write(name);//Writing Patient's name
    assert.ok(text(name).exists());//Verifying the Patient's name existing in disposition type
    await click(disposition_type,below("Action"));//Click on Type below action
});
step("Checking for Admit Functinality",async()=>{
    var name = "Demo Pat";
    await click("Rehabilitation Center");//Click on Rehabilitation Center
    await click("Rehabilitation Center (5th floor)");//Click on Rehabilitation Center (5th floor)
    await click("505");//Click on Bed NO.505
    await waitFor("AVAILABLE");//Waiting till the word Available is visible
    assert.ok(text("AVAILABLE",toRightOf("Status")).exists());//Verifying if the status is Available
    await click("Admit");//Click on Admit
    await waitFor(3000);//Wait for 3s
    await click("Cancel");//Verifying if the Cancel button works
    await click("505",toRightOf("506/2"));
    await click("Admit");//Click on Admit
    await waitFor(3000);//Wait for 3s
    assert.ok(text("Admit Summary").exists());//Verify admit pop-up
    await click("Admit");//Click on Admit
    await waitFor(5000);//Wait for 5s
});
step("Check if the patient is present in Admitted Section",async()=>{
    var name = "Demo Pat";
    await openTab("https://qa-amman.ehealthunit.org/bahmni/bedmanagement/#/home");//Going back to Admitted Section
    await write(name);//Providing Patient's name
    assert.ok(text(name).exists());//Verifying Patient's name
});
step("Change Disposition Type",async()=>{
    var patient_id = "EG104452M";
    await click("Enter Disposition");//Click on Enter Disposition
    await switchTo("https://qa-amman.ehealthunit.org/bahmni/clinical/#/programs/patient/3b3c48f2-8b2c-48e8-8659-3b1269bae406/dashboard/disposition?dateEnrolled=2021-05-26T00:00:00.000&programUuid=00b914c7-227c-11eb-b77d-000c29554d70&enrollment=0629dad7-5d2c-4867-8e67-4063427c38ab");//Goto Disposition page
    await dropDown("Disposition Type").select("Movement to RC");//Click on Movement to RC
    await click("Save");//Click on Save
});
step("Verify if the Disposition Type is changed",async()=>{
    var name = "Demo Pat";
    var patient_id = "EG104452M";
    await openTab("https://qa-amman.ehealthunit.org/bahmni/bedmanagement/#/home");//Open Admited Section page
    await click("Movement to RC");//Click on Movement to RC
    await write(name);//Providing Patient's name
    assert.ok(text(name).exists());//Verifying Patient's name in Movement to RC
    await click(patient_id);//Click on Patient's ID
});
step("Checking for Transfer Functionality",async()=>{
        await waitFor(3000);//Wait for 3s
        await click("506/1");//Click on 506/1 bed
        await waitFor(3000);//Wait for 3s
        await waitFor("AVAILABLE");//Wait till Available word is present
        assert.ok(text("AVAILABLE",toRightOf("Status")).exists());//Verify if the status is available
        await click("Transfer");//Click on Transfer button
        await waitFor(3000);//Wait for 3s
        await click("Cancel");//Click on Cancel button
        await click("Transfer");//Click on Transfer button
        await waitFor(3000);//Wait for 3s
        assert.ok(text("Patient Movement").exists());//Verify the Transfer pop-up summary
        await click("Move",toLeftOf("Cancel"));//Click on Move
        await waitFor("OCCUPIED");//Wait for Occupied word to be visible
        assert.ok(text("OCCUPIED",toRightOf("Status")).exists()); //Verify if the status is Occupied
});
step("Checking Discharge Functionality",async()=>{
    await openTab("https://qa-amman.ehealthunit.org/bahmni/bedmanagement/#/bedManagement/patient/3b3c48f2-8b2c-48e8-8659-3b1269bae406");
    await click("Discharge");//Click on Discharge
    await waitFor(3000);//Wait for 3s
    await click("Cancel");//Click on Cancel and verify the cancel button
    await click("506/1",above("507/1"));
    await click("Discharge");//Click on Discharge
    await waitFor(3000);//Wait for 3s
    await waitFor("Discharge Summary");//Wait for Discharge Summary to be visible
    assert.ok(text("Discharge Summary").exists());//Verify the discharge pop-up
    await click("Discharge");//Click on discharge
    await waitFor(3000);//Wait for 3s
    await openTab("https://qa-amman.ehealthunit.org/bahmni/bedmanagement/#/bedManagement/patient/3b3c48f2-8b2c-48e8-8659-3b1269bae406");
    await waitFor("Rehabilitation Center");//Wait for Rehabilitation Center to be visible
    await click("Rehabilitation Center",toRightOf("Ward"));//Click on Rehabilitation Center
    await click("Rehabilitation Center (5th floor)");//Click on Rehabilitation Center (5th floor)
    await click("506/1");//Click on 506/1 bed no.
    await waitFor("AVAILABLE");//Wait for Available word to be visible
    assert.ok(text("AVAILABLE",toRightOf("Status")).exists());//Verify if the status is Available
    await waitFor("Edit");//Wait for edit word to be visible
    await click("Edit");//Click on Edit
    await timeField(below(text('Expected Date of Discharge'))).select(new Date('2021-05-30'));//Set date
    await waitFor(3000);//Wait for 3s
    await click("Save");//Click on Save
    await waitFor(3000);//Wait for 3s
});
step("Changing back the disposition type to previous type",async()=>{
    await openTab("https://qa-amman.ehealthunit.org/bahmni/clinical/#/programs/patient/3b3c48f2-8b2c-48e8-8659-3b1269bae406/dashboard/disposition?dateEnrolled=2021-05-26T00:00:00.000&programUuid=00b914c7-227c-11eb-b77d-000c29554d70&enrollment=0629dad7-5d2c-4867-8e67-4063427c38ab");
    await dropDown("Disposition Type").select("Admit to RC");//Changing back to the disposition type
    await click("Save");//Click on save
    await waitFor(5000);//Wait for 5s
    await openTab("https://qa-amman.ehealthunit.org/bahmni/bedmanagement/#/home");
});