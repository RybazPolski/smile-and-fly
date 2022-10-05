const puppeteer = require('puppeteer');
const rainbow = require("./biura_podrozy/rainbow")
const tui = require("./biura_podrozy/tui")
const itaka = require("./biura_podrozy/itaka")

async function getTest(query){
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: ''
    });

    const page = await browser.newPage();

    const url = `https://newyork.craigslist.org/search/sss?hasPic=1&query=${query}#search=1~gallery~0~0`;

    await page.goto(url);

    await page.waitForSelector(".cl-search-result");

    const results = await page.$$eval(".cl-search-result", elements => {
        return elements.map(el => {
            const properties = {};
            const titleEl = el.querySelector(".post-title .label");
            const title = el.querySelector(".post-title .label").innerHTML;
            properties.titleEl = titleEl;
            properties.title = title;
            return properties;
        });
    })

    console.log(results)

    browser.close()
}









async function getAll(dateFrom = "dowolna", dateTo = "dowolna", fromWhere = [], toWhere = [], adults = 1, kids = [], order="najblizsze", pages=1){}

tui.getOffers("2022-09-01","2023-06-01",[],["dom","egi-sha","egi-tab","dupa"],c,["2013-12-02","2011-03-11","2006-10-28"],"priceAsc",30)
// rainbow.getOffers("2022-11-01","2022-12-31",["WAW","WMI"],["his"],2,["2005-05-05"],"",60)
// console.log(.then)

// tui.getOffers("2022-11-01","2022-12-31",["WAW","WMI"],["dom"],2,["2005-05-05","2006-06-06"],"",60)
