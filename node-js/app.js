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
            console.log("fetching data from DOM tree...")
            let i = 0;
        return elements.map(el => {
            const properties = {};
            const titleEl = el.querySelector(".post-title .label");
            const title = el.querySelector(".post-title .label").innerHTML;
            properties.titleEl = titleEl;
            properties.title = title;
            i++
                console.log("element no. "+i+" fetched")
                return properties;
        });
    })

    console.log(results)

    browser.close()
}









async function getAll(dateFrom = "dowolna", dateTo = "dowolna", fromWhere = [], toWhere = [], adults = 1, kids = [], order="najblizsze", pages=1){}

// tui.getOffers("2022-09-01","2023-06-01",[],["dom","egi-sha","egi-tab","dupa"],2,["2013-12-02","2011-03-11","2006-10-28"],"priceAsc",30)
// rainbow.getOffers("2022-11-01","2022-12-31",["WAW","WMI"],["his"],1,["2005-05-05"],"",60)
// console.log(.then)

// itaka.getOffers("2022-12-16","2023-01-6",[],["egi-mar"],2,["2005-05-05","2006-06-06"],"",51).then((e)=>{console.log(e)})
let diagStart = new Date();
itaka.getOffers("2022-11-01","2023-04-31",[],["his"],1,[],"",250).then(e=>{console.log(e);console.log(e.length);console.log("Query took "+((new Date()).getTime()-diagStart.getTime())+" seconds")})
// console.log(getTest("lego"))