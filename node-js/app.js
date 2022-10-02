const puppeteer = require('puppeteer');

async function getBowls(){
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: ''
    });

    const page = await browser.newPage();

    const url = 'https://newyork.craigslist.org/search/sss?hasPic=1&query=bowl#search=1~gallery~0~0';

    page.goto(url);
}

getBowls();