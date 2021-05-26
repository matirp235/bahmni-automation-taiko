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

