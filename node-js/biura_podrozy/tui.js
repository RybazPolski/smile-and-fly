const puppeteer = require('puppeteer')
const utils = require('../utils')

/**
 * @description Zwraca oferty wycieczek samolotem z biura podróży TUI zgodnie z podanymi kryteriami
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
async function getOffers(dateFrom = "", dateTo = "", fromWhere = [], toWhere = [], adults = 1, kids = [], order = "dateAsc", results = 30){

    url = "https://www.tui.pl/wypoczynek/wyniki-wyszukiwania-samolot?q="

    if(order=="priceAsc"){
        url += ":price"
    }else if(order=="priceDesc"){
        url += ":priceDESC"
    }else if(order=="dateAsc"||order==""){
        url += ":flightDate"
    }

    url += ":byPlane:T"
    
    let startPoints = []
    if(Array.isArray(fromWhere)){
        for(const el of fromWhere){
            if(el=='BZG'){
                startPoints.push('BZG')
                }else if(el=='GDN'){
                startPoints.push('GDN')
                }else if(el=='KTW'){
                startPoints.push('KTW')
                }else if(el=='KRK'){
                startPoints.push('KRK')
                }else if(el=='LUZ'){
                startPoints.push('LUZ')
                }else if(el=='LCJ'){
                startPoints.push('LCJ')
                }else if(el=='POZ'){
                startPoints.push('POZ')
                }else if(el=='SZZ'){
                startPoints.push('SZZ')
                }else if(el=='WAW'){
                startPoints.push('WAW')
                }else if(el=='WMI'){
                startPoints.push('WMI')
                }else if(el=='WRO'){
                startPoints.push('WRO')
                }else if(el=='RZE'){
                startPoints.push('RZE')
                }
        } 
    }
    if(startPoints!=[]){
        url += ":a:"+startPoints.join(":a:")
    }
    
    url += ":dF:1:dT:999"

    if(dateFrom!=""){
        // let _dateFrom = new Date(dateFrom);
        let _dateFrom = new Date(dateFrom) < new Date() ? new Date() : new Date(dateFrom);
        url += `:startDate:${("0"+_dateFrom.getDate()).slice(-2)}.${("0"+(_dateFrom.getMonth()+1)).slice(-2)}.${_dateFrom.getFullYear()}`
    }else{
        let _dateFrom = new Date();
        url += `:startDate:${("0"+_dateFrom.getDate()).slice(-2)}.${("0"+(_dateFrom.getMonth()+1)).slice(-2)}.${_dateFrom.getFullYear()}`    
    }
    
    if(dateTo!=""){
        let _dateTo = new Date(dateTo);
        url += `:endDate:${("0"+_dateTo.getDate()).slice(-2)}.${("0"+(_dateTo.getMonth()+1)).slice(-2)}.${_dateTo.getFullYear()}`
    }

    url += ":ctAdult:"+adults


    if(kids.length!=0){
        let _kids = []
        for(let i=0;i<kids.length;i++){
            const date = new Date(kids[i])
            _kids[i] = `${("0"+date.getDate()).slice(-2)}.${("0"+(date.getMonth()+1)).slice(-2)}.${date.getFullYear()}`
        }
        url += `:ctChild:${_kids.length}:birthDate:${_kids.join(":birthDate:")}`

    }

    let destinations = []
    if(Array.isArray(toWhere)){
        for(const el of toWhere){
            if(el=='dom'){
                destinations.push('DO')
                }else if(el=='egi'){
                destinations.push('EG')
                }else if(el=='egi-hur'){
                destinations.push('HRG')
                }else if(el=='egi-mar'){
                destinations.push('RMF')
                }else if(el=='egi-sha'){
                destinations.push('SSH')
                }else if(el=='gre'){
                destinations.push('GR')
                }else if(el=='gre-aie'){
                destinations.push('ATH')
                }else if(el=='gre-cha'){
                destinations.push('SKG')
                }else if(el=='gre-kor'){
                destinations.push('CFU')
                }else if(el=='gre-kos'){
                destinations.push('KGS')
                }else if(el=='gre-kre'){
                destinations.push('CHQ')
                }else if(el=='gre-myk'){
                destinations.push('JMK')
                }else if(el=='gre-pel'){
                destinations.push('GPA')
                }else if(el=='gre-rod'){
                destinations.push('RHO')
                }else if(el=='gre-sam'){
                destinations.push('SMI')
                }else if(el=='gre-san'){
                destinations.push('JTR')
                }else if(el=='gre-zak'){
                destinations.push('ZTH')
                }else if(el=='his'){
                destinations.push('ES')
                }else if(el=='his-cba'){
                destinations.push('BCN')
                }else if(el=='his-cbr'){
                destinations.push('GRO')
                }else if(el=='his-cdl'){
                destinations.push('HEV')
                }else if(el=='his-cdo'){
                destinations.push('REU')
                }else if(el=='his-cds'){
                destinations.push('AGP')
                }else if(el=='his-for'){
                destinations.push('FXX')
                }else if(el=='his-ibi'){
                destinations.push('IBZ')
                }else if(el=='his-mad'){
                destinations.push('MAD')
                }else if(el=='his-maj'){
                destinations.push('PMI')
                }else if(el=='his-min'){
                destinations.push('MAH')
                }else if(el=='mek'){
                destinations.push('CUN')
                }else if(el=='tur'){
                destinations.push('TR')
                }else if(el=='tur-reg'){
                destinations.push('ADB')
                }else if(el=='tur-rtu'){
                destinations.push('AYT')
                }
        }    
    }
    if(destinations!=[]){
        url += ":c:"+destinations.join(":c:")
    }

    url += ":minHotelCategory:defaultHotelCategory:tripAdvisorRating:defaultTripAdvisorRating:beach_distance:defaultBeachDistance"

    url += ":tripType:WS"

    url += "&fullPrice=false"
    // console.log(url)

    const browser = await puppeteer.launch({
        // headless: false,
        defaultViewport: ''
    });
    const page = await browser.newPage();
    await page.goto(url);
    
    await page.waitForSelector(".cookies-bar__button--accept")
    page.evaluate(_ => {
        document.querySelector(".cookies-bar__button--accept").click()
    })

    if(!(await page.waitForSelector(".offer-tile-wrapper"))){
        return []
    }

    await utils.autoScroll(page);

    while(await page.evaluate(_=>{return document.querySelectorAll('.offer-tile-wrapper').length}) < results){
        await page.evaluate(_=>{
            for(let el of document.querySelectorAll('.offer-tile-wrapper')){
                el.classList.add('prepared')
            }
        })
        if(await page.evaluate(_=>{return document.querySelectorAll('.results-container__button').length==0})) break;false        
        await page.evaluate(_=>{document.querySelector(".results-container__button").click()})
        await page.waitForSelector(".offer-tile-wrapper:not(.prepared)")
        await utils.autoScroll(page)
    }

    const offers = (await page.$$eval(".offer-tile-wrapper", elements => {
            return elements.map(el => {
                const properties = {};
                
                properties.travelAgency = "TUI" 

                const title = el.querySelector(".offer-tile-body__hotel-name").innerHTML;
                properties.title = title;
                
                const stars = el.querySelectorAll(".Rating_item__h0rsh").length ? el.querySelectorAll(".Rating_item__h0rsh").length : null;
                properties.stars = stars;

                let locations = el.querySelector(".breadcrumbs__list").querySelectorAll(".breadcrumbs__item")
                let toJoin = new Array()
                for(let eel of locations){
                    toJoin.push(eel.innerText)
                }
                const location = toJoin.join(' / ')
                properties.location = location;

                const price = parseFloat(el.querySelector(".price-value__amount").innerText.replace(" ",""));
                properties.price = price;

                const oldPrice = null
                properties.oldPrice = oldPrice;

                const dates = el.querySelector("[data-testid=offer-tile-departure-date]").innerText.split(" (")[0].split(" - ")
                const dateFrom = dates[0]
                const dateTo = dates[1]
                const timeFrom = Date.parse(`${dateFrom.substring(6)}-${dateFrom.substring(3,5)}-${dateFrom.substring(0,2)}`)
                const timeTo = Date.parse(`${dateTo.substring(6)}-${dateTo.substring(3,5)}-${dateTo.substring(0,2)}`)
                properties.timeFrom = timeFrom
                properties.timeTo = timeTo

                const food = el.querySelector("[data-testid=offer-tile-boardType]").innerText
                properties.food = food

                const offerLink = el.querySelector(".offer-tile-body__title > a").href
                properties.offerLink = offerLink

                try{
                    const imageLink = el.querySelector(".CarouselNew_carousel__WqEi_").querySelector('img').src || null
                    properties.imageLink = imageLink
                }catch(e){
                    console.log(e)
                }

                return properties;
            });
        }))

        

    browser.close()
    return offers.slice(0,results)
 
}

// console.log("Zaimportowano skrypt dla biura podrozy TUI")
module.exports = {
    getOffers
}