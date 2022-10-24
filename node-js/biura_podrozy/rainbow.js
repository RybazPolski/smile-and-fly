const puppeteer = require('puppeteer')
const utils = require('../utils')
async function getOffers(dateFrom = "", dateTo = "", fromWhere = [], toWhere = [], adults = 1, kids = [], order = "dateAsc", results = 30, ip){
    
    
    let url = "https://r.pl/szukaj?"
    
    if(dateFrom!=""){
        let _dateFrom = new Date(dateFrom) < new Date() ? new Date() : new Date(dateFrom);
        url += `&data=${_dateFrom.getFullYear()}-${("0"+(_dateFrom.getMonth()+1)).slice(-2)}-${("0"+_dateFrom.getDate()).slice(-2)}`
    }else{
        let _dateFrom = new Date()
        url += `&data=${_dateFrom.getFullYear()}-${("0"+(_dateFrom.getMonth()+1)).slice(-2)}-${("0"+_dateFrom.getDate()).slice(-2)}`
    }
    if(dateTo!=""){
        let _dateTo = new Date(dateTo);
        url += `&data=${_dateTo.getFullYear()}-${("0"+(_dateTo.getMonth()+1)).slice(-2)}-${("0"+_dateTo.getDate()).slice(-2)}`
    }else{
        let _dateFrom = new Date()
        url += `&data=${_dateFrom.getFullYear()+1}-${("0"+(_dateFrom.getMonth()+1)).slice(-2)}-${("0"+_dateFrom.getDate()).slice(-2)}`
    }
    
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
                }
        } 
    }
    if(startPoints.length>0){
        url += "&wybraneSkad="+startPoints.join('&wybraneSkad=')
    }

    let destinations = []
    if(Array.isArray(toWhere)){
        for(const el of toWhere){
            if(el=='dom'){
                destinations.push('dominikana')
                }else if(el=='dom-pue'){
                destinations.push('puerto-plata')
                }else if(el=='dom-sam'){
                destinations.push('samana')
                }else if(el=='egi'){
                destinations.push('egipt')
                }else if(el=='egi-hur'){
                destinations.push('hurghada')
                }else if(el=='egi-mar'){
                destinations.push('marsa-alam')
                }else if(el=='egi-sha'){
                destinations.push('sharm-el-sheikh')
                }else if(el=='gre'){
                destinations.push('grecja')
                }else if(el=='gre-cha'){
                destinations.push('chalkidiki')
                }else if(el=='gre-kef'){
                destinations.push('kefalonia')
                }else if(el=='gre-kok'){
                destinations.push('kokkino-nero')
                }else if(el=='gre-kor'){
                destinations.push('korfu')
                }else if(el=='gre-kos'){
                destinations.push('kos')
                }else if(el=='gre-kre'){
                destinations.push('kreta-heraklion&wybraneDokad=kreta-chania')
                }else if(el=='gre-lef'){
                destinations.push('lefkada')
                }else if(el=='gre-les'){
                destinations.push('lesbos')
                }else if(el=='gre-myk'){
                destinations.push('mykonos')
                }else if(el=='gre-nax'){
                destinations.push('naxos')
                }else if(el=='gre-pel'){
                destinations.push('peloponez')
                }else if(el=='gre-rio'){
                destinations.push('riwiera-olimpijska')
                }else if(el=='gre-rod'){
                destinations.push('rodos')
                }else if(el=='gre-san'){
                destinations.push('santorini')
                }else if(el=='gre-zak'){
                destinations.push('zakynthos')
                }else if(el=='his'){
                destinations.push('hiszpania')
                }else if(el=='his-alm'){
                destinations.push('almeria')
                }else if(el=='his-cal'){
                destinations.push('costa-almeria')
                }else if(el=='his-cbl'){
                destinations.push('costa-blanca')
                }else if(el=='his-cbr'){
                destinations.push('costa-brava')
                }else if(el=='his-cdl'){
                destinations.push('costa-de-la-luz')
                }else if(el=='his-cdm'){
                destinations.push('costa-del-marasame')
                }else if(el=='his-cdo'){
                destinations.push('costa-dorada')
                }else if(el=='his-cds'){
                destinations.push('costa-del-sol')
                }else if(el=='his-fue'){
                destinations.push('fuerteventura')
                }else if(el=='his-gra'){
                destinations.push('gran-canaria')
                }else if(el=='his-maj'){
                destinations.push('majorka')
                }else if(el=='his-ten'){
                destinations.push('teneryfa')
                }else if(el=='his-wyb'){
                destinations.push('costa-de-cadiz')
                }else if(el=='mek'){
                destinations.push('meksyk')
                }else if(el=='mek-can'){
                destinations.push('canun')
                }else if(el=='mek-juk'){
                destinations.push('jukatan')
                }else if(el=='mek-riv'){
                destinations.push('riviera-maya')
                }else if(el=='tur'){
                destinations.push('turcja')
                }else if(el=='tur-mam'){
                destinations.push('mamaris')
                }else if(el=='tur-reg'){
                destinations.push('riwieria-egejska')
                }else if(el=='tur-rtu'){
                destinations.push('riwiera-turecka')
                }
        }    
    }
    if(destinations.length>0){
        url += "&wybraneDokad="+destinations.join('&wybraneDokad=')
    }

    let _adults = ""
    for(let i=1;i<=adults;i++){
        _adults+="&dorosli=1992-01-01"
    }
    url += _adults

    if(kids.length==0){
        url += '&dzieci=nie'
    }else{
        let _kids = ""
        for(const el of kids){
            const date = new Date(el)
            _kids+=`&dzieci=${date.getFullYear()}-${("0"+(date.getMonth()+1)).slice(-2)}-${("0"+date.getDate()).slice(-2)}`
        }
        url += _kids
    }

    url += "&typTransportu=AIR"

    if(order=="priceAsc"){
        url += "&sortowanie=cena-asc"
    }else if(order=="priceDesc"){
        url += "&sortowanie=cena-desc"
    }else if(order=="dateAsc"||order==""){
        url += "&sortowanie=termin-asc"
    }

    url += "&widok=list&dowolnaLiczbaPokoi=tak&cena=avg"

    console.log(`[For: ${ip}] Rainbow url generated.`)


    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: '',
        args: ['--no-sandbox','--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(url);
    
    console.log(`[For: ${ip}] Getting Rainbow offers.`)
    
    try{
        await page.waitForSelector(".bloczek__container")
    }catch(e){
        console.log(`[For: ${ip}] Rainbow found 0 offers.`)
        return []
    }


    await utils.autoScroll(page);

    while(await page.evaluate(_=>{return document.querySelectorAll('.bloczek__container').length}) < results){
        await page.evaluate(_=>{
            for(let el of document.querySelectorAll('.bloczek__container')){
                el.classList.add('prepared')
            }
        })
        if(await page.evaluate(_=>{return document.querySelectorAll('.pokaz-wiecej__icon').length==0})) break;false  
        const moreButton = await page.$('.pokaz-wiecej__icon');
        await moreButton.click();
        // await page.evaluate(_=>{document.querySelector('.pokaz-wiecej__icon').dispatchEvent(new Event('click'))})
        try{
            await page.waitForSelector(".bloczek__container:not(.prepared)")
        }catch(e){
            console.log(e)
            if(await page.evaluate(_=>{return document.querySelectorAll('.bloczek__container').length}) > 0){
                break
            }else{
                console.log(`[For: ${ip}] Rainbow found 0 offers.`)
                return []
            }
        }
        await utils.autoScroll(page)
    }

    console.log(`[For: ${ip}] Preparing Rainbow offers.`)
    const offers = (await page.$$eval(".bloczek__container", elements => {
            return elements.map(el => {
                const properties = {};
                
                properties.travelAgency = "Rainbow" 

                try{
                    const title = el.querySelector(".bloczek__tytul").innerText;
                    properties.title = title;
                }catch(e){
                    properties.title = null
                    console.log(e)
                }
                
                try{
                    const stars = el.querySelectorAll('.bloczek__sloneczka').length ? el.querySelector('.bloczek__sloneczka').dataset.rating : null;
                    properties.stars = stars;
                }catch(e){
                    properties.stars = null
                    console.log(e)
                }


                try{
                    const location = el.querySelector(".bloczek__lokalizacja--text").innerText.split(' • ')[1].replace(':',' /').replace('-','/').toUpperCase()
                    properties.location = location;
                }catch(e){
                    properties.location = null
                    console.log(e)
                }

                try{
                    const price = parseFloat(el.querySelector(".bloczek__cena").innerText.replace(" ",""));
                    properties.price = price;
                }catch(e){
                    properties.price = null
                    console.log(e)
                }

                try{
                    const oldPrice = el.querySelector(".bloczek__cena-kreslona")==null ? null : parseFloat(el.querySelector(".bloczek__cena-kreslona").innerText.replace(" ",""))
                    properties.oldPrice = oldPrice;
                }catch(e){
                    properties.oldPrice = null
                    console.log(e)
                }
                
                try{
                    const params = el.querySelectorAll('.bloczek__parametr-text')
                
                    try{
                        const dateFrom = params[0].innerText.split(' (')[0]
                        const timeFrom = Date.parse(`${dateFrom.substring(6)}-${dateFrom.substring(3,5)}-${dateFrom.substring(0,2)}`)
                        properties.timeFrom = timeFrom
                        
                        try{
                            const duration = parseInt(params[0].innerText.split('(')[1])*24*60*60*1000
                            const timeTo = timeFrom+duration
                            properties.timeTo = timeTo
                        }catch(e){
                            properties.timeTo = null
                            console.log(e)
                        }
                    }catch(e){
                        properties.dateFrom = null
                        properties.timeTo = null
                        console.log(e)
                    }
                    
                    try{
                        const food = params[2].innerText
                        properties.food = food
                    }catch(e){
                        properties.food = null
                        console.log(e)
                    }
                    
                }catch(e){
                    properties.dateFrom = null
                    properties.timeTo = null
                    properties.food = null
                    console.log(e)
                }


                try{
                    const offerLink = el.querySelector(".bloczek__tytul").parentElement.href
                    properties.offerLink = offerLink
                }catch(e){
                    properties.offerLink = null
                    console.log(e)
                }

                try{
                    const imageLink = el.querySelector(".bloczek__img").src || null
                    properties.imageLink = imageLink
                }catch(e){
                    properties.imageLink = null
                    console.log(e)
                }

                return properties;
            });
        }))

        

    browser.close()
    console.log(`[For: ${ip}] Rainbow found ${offers.slice(0,results).length} offers.`)
    return offers.slice(0,results)

}

// console.log("Zaimportowano skrypt dla biura podrozy Rainbow")
module.exports = {
    getOffers
}