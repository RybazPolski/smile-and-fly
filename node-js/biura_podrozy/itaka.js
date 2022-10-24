const puppeteer = require('puppeteer')
const utils = require('../utils')



/**
 * @description Zwraca oferty wycieczek samolotem z biura podróży Itaka zgodnie z podanymi kryteriami
 * @param {String} dateFrom Od kiedy (yyyy-mm-dd)
 * @param {String} dateTo Do kiedy (yyyy-mm-dd)
 * @param {String} fromWhere Skąd (Kody lotnisk dostępne pod adresem https://github.com/julianrybarczyk/slime-and-fall/blob/main/README.md)
 * @param {String} toWhere Dokąd (Kody regionów dostępne pod adresem https://github.com/julianrybarczyk/slime-and-fall/blob/main/README.md)
 * @param {Number} adults Ilość dorosłych
 * @param {Array.<String>} kids Daty urodzenia dzieci w tablicy
 * @param {('priceAsc'|'priceDesc'|'dateAsc')} order Sortowanie (cena rosnąco / cena malejąco / najbliższy termin)
 * @param {Number} results Ilość wyników do zwrócenia
 * @returns {Array} Tablica obiektów
 * 
 */
async function getOffers(dateFrom = "", dateTo = "", fromWhere = [], toWhere = [], adults = 1, kids = [], order = "dateAsc", results = 30, ip){
    
    let url = "https://www.itaka.pl/wyniki-wyszukiwania/wakacje/?view=offerList"

    if(dateFrom!=""){
        let _dateFrom = new Date(dateFrom) < new Date() ? new Date() : new Date(dateFrom);
        url += `&date-from=${_dateFrom.getFullYear()}-${("0"+(_dateFrom.getMonth()+1)).slice(-2)}-${("0"+_dateFrom.getDate()).slice(-2)}`
    }
    if(dateTo!=""){
        let _dateTo = new Date(dateTo);
        url += `&date-to=${_dateTo.getFullYear()}-${("0"+(_dateTo.getMonth()+1)).slice(-2)}-${("0"+_dateTo.getDate()).slice(-2)}`
    }
    
    let startPoints = []
    if(Array.isArray(fromWhere)){
        for(const el of fromWhere){
            if(el=='GDN'){
                startPoints.push('gdansk')
                }else if(el=='KTW'){
                startPoints.push('katowice')
                }else if(el=='KRK'){
                startPoints.push('krakow')
                }else if(el=='POZ'){
                startPoints.push('poznan')
                }else if(el=='SZZ'){
                startPoints.push('szczecin')
                }else if(el=='WAW'){
                startPoints.push('warszawa')
                }else if(el=='WMI'){
                startPoints.push('warszawa-modlin')
                }else if(el=='WRO'){
                startPoints.push('wroclaw')
                }else if(el=='ZLG'){
                startPoints.push('zielona-gora')
                }
        } 
    }
    if(startPoints!=[]){
        url += "&dep-region="+startPoints.join(",")
    }
    
    let destinations = []
    if(Array.isArray(toWhere)){
        for(const el of toWhere){
            if(el=='dom'){
                destinations.push('dominikana')
                }else if(el=='egi'){
                destinations.push('egipt')
                }else if(el=='egi-hur'){
                destinations.push('hurghada-province')
                }else if(el=='egi-mar'){
                destinations.push('marsa-alam-province')
                }else if(el=='egi-tab'){
                destinations.push('taba-province')
                }else if(el=='gre'){
                destinations.push('grecja')
                }else if(el=='gre-cha'){
                destinations.push('chalkidiki-province')
                }else if(el=='gre-kas'){
                destinations.push('kasandra-province')
                }else if(el=='gre-kor'){
                destinations.push('korfu-province')
                }else if(el=='gre-kos'){
                destinations.push('kos-province')
                }else if(el=='gre-kre'){
                destinations.push('kreta-province')
                }else if(el=='gre-les'){
                destinations.push('lesbos-province')
                }else if(el=='gre-myk'){
                destinations.push('mykonos-province')
                }else if(el=='gre-ria'){
                destinations.push('riwiera-atenska-province')
                }else if(el=='gre-rod'){
                destinations.push('rodos-province')
                }else if(el=='gre-sam'){
                destinations.push('samos-province')
                }else if(el=='gre-tha'){
                destinations.push('thassos-province')
                }else if(el=='gre-zak'){
                destinations.push('zakynthos-province')
                }else if(el=='his'){
                destinations.push('hiszpania')
                }else if(el=='his-cbl'){
                destinations.push('costa-blanca-province')
                }else if(el=='his-cds'){
                destinations.push('costa-del-sol-province')
                }else if(el=='his-ibi'){
                destinations.push('ibiza-province')
                }else if(el=='his-maj'){
                destinations.push('majorka-province')
                }else if(el=='mek'){
                destinations.push('meksyk')
                }else if(el=='tur'){
                destinations.push('turcja')
                }else if(el=='tur-ala'){
                destinations.push('alanya-province')
                }else if(el=='tur-ant'){
                destinations.push('antalya-province')
                }else if(el=='tur-bel'){
                destinations.push('belek-province')
                }else if(el=='tur-bod'){
                destinations.push('bodrum-province')
                }else if(el=='tur-did'){
                destinations.push('didyma-province')
                }else if(el=='tur-fin'){
                destinations.push('finike-province')
                }else if(el=='tur-kem'){
                destinations.push('kemer-province')
                }else if(el=='tur-kus'){
                destinations.push('kusadasi-province')
                }else if(el=='tur-mam'){
                destinations.push('marmaris-province')
                }else if(el=='tur-sid'){
                destinations.push('side-province')
                }else if(el=='tur-sta'){
                destinations.push('stambul-province')
                }
        }    
    }
    if(destinations!=[]){
        url += "&dest-region="+destinations.join(",")
    }

    let _kids = "&kids="+kids.join(",");


    let _adults = "&adults="+adults;

    if(order=="priceAsc"){
        url += "&order=priceAsc"
    }else if(order=="priceDesc"){
        url += "&order=priceDesc"
    }else if(order=="dateAsc"||order==""){
        url += "&order=dateFromAsc"
    }

    // console.log(url)
    console.log(`[For: ${ip}] Itaka url generated.`)


    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: '',
        args: ['--no-sandbox','--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(url);

    console.log(`[For: ${ip}] Getting Itaka offers.`)

    try{
        await page.waitForSelector(".details_save--1ja7w")
        page.evaluate(_ => {
            document.querySelector(".details_save--1ja7w").click()
        })
    }catch(e){
    }

    try{
        await page.waitForSelector(".offer")
    }catch(e){
        console.log(`[For: ${ip}] Itaka found 0 offers.`)
        return []
    }

    await utils.autoScroll(page);

    while(await page.evaluate(_=>{return document.querySelectorAll('.offer').length}) < results){
        await page.evaluate(_=>{
            for(let el of document.querySelectorAll('.offer')){
                el.classList.add('prepared')
            }
        })
        if(await page.evaluate(_=>{return document.querySelectorAll('.offer-list_more-offers').length==0})) break;false        
        await page.evaluate(_=>{document.querySelector(".offer-list_more-offers").click()})
        try{
            await page.waitForSelector(".offer:not(.prepared)")
        }catch(e){
            console.log(e)
            if(await page.evaluate(_=>{return document.querySelectorAll('.offer').length}) > 0){
                break
            }else{
                console.log(`[For: ${ip}] Itaka found 0 offers.`)
                return []
            }
        }
        await utils.autoScroll(page)
    }

    console.log(`[For: ${ip}] Preparing Itaka offers.`)
    const offers = (await page.$$eval(".offer", elements => {
            return elements.map(el => {
                const properties = {};
                
                properties.travelAgency = "Itaka" 

                try{
                    const title = el.querySelector(".header_title > a").innerHTML;
                    properties.title = title;
                }catch(e){
                    properties.title = null
                    console.log(e)
                }
                
                try{
                    const stars = el.querySelectorAll(".header_stars_link > span").length ? (el.querySelector(".header_stars_link > span").querySelectorAll(".star").length - (el.querySelector(".header_stars_link > span").querySelectorAll(".star_half").length/2)) : null;
                    properties.stars = stars;
                }catch(e){
                    properties.stars = null
                    console.log(e)
                }

                try{
                    const location = el.querySelector(".header_geo-labels").innerText.toUpperCase()
                    properties.location = location;
                }catch(e){
                    properties.location = null
                    console.log(e)
                }

                try{
                    const price = parseFloat(el.querySelector(".current-price_value").innerText.replace(" ",""));
                    properties.price = price;
                }catch(e){
                    properties.price = null
                    console.log(e)
                }

                try{
                    const oldPrice = el.querySelector(".old-price_value")==null ? null : parseFloat(el.querySelector(".old-price_value").innerText.replace(" ",""))
                    properties.oldPrice = oldPrice;
                }catch(e){
                    properties.oldPrice = null
                    console.log(e)
                }

                try{
                    const dates = el.querySelector(".offer_date > .offer_date_icon-container + span").innerText.split(" (")[0].split("-")
                    
                    try{
                        const dateFrom = dates[0].length==5?dates[0]+=dates[1].substring(5):dates[0]
                        const timeFrom = Date.parse(`20${dateFrom.substring(6)}-${dateFrom.substring(3,5)}-${dateFrom.substring(0,2)}`)
                        properties.timeFrom = timeFrom
                    }catch(e){
                        properties.timeFrom = null
                        console.log(e)
                    }
                    
                    try{
                        const dateTo = dates[1]
                        const timeTo = Date.parse(`20${dateTo.substring(6)}-${dateTo.substring(3,5)}-${dateTo.substring(0,2)}`)
                        properties.timeTo = timeTo
                    }catch(e){
                        properties.timeTo = null
                        console.log(e)
                    }
                }catch(e){
                    properties.timeFrom = null
                    properties.timeTo = null
                    console.log(e)
                }

                try{
                    const food = el.querySelector(".offer_food").innerText
                    properties.food = food
                }catch(e){
                    properties.food = null
                    console.log(e)
                }

                try{
                    const offerLink = el.querySelector(".offer_link").href
                    properties.offerLink = offerLink
                }catch(e){
                    properties.offerLink = null
                    console.log(e)
                }

                try{
                    const imageLink = el.querySelector(".figure_main-photo").src || el.querySelector(".item_photo-img").src || null
                    properties.imageLink = imageLink
                }catch(e){
                    properties.imageLink = null
                    console.log(e)
                }

                return properties;
            });
        }))

        

    browser.close()
    console.log(`[For: ${ip}] Itaka found ${offers.slice(0,results).length} offers.`)
    return offers.slice(0,results)
}

// console.log("Zaimportowano skrypt dla biura podrozy Itaka")
module.exports = {
    getOffers
}