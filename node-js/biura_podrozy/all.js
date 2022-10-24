const rainbow = require("./rainbow")
const tui = require("./tui")
const itaka = require("./itaka");
const extend = require("node.extend")
/**
 * @description Zwraca oferty wycieczek samolotem z biur podróży TUI i Itaka zgodnie z podanymi kryteriami
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
async function getOffers(options, ip="unknown"){

    let o = {dateFrom: "", dateTo: "", fromWhere: [], toWhere: [], adults: 1, kids: [], order: "dateAsc", results: 30}
    extend(true,o,options)
    let res = await Promise.all([
            tui.getOffers(o.dateFrom,o.dateTo,o.fromWhere,o.toWhere,o.adults,o.kids,o.order,o.results,ip),
          itaka.getOffers(o.dateFrom,o.dateTo,o.fromWhere,o.toWhere,o.adults,o.kids,o.order,o.results, ip),
        rainbow.getOffers(o.dateFrom,o.dateTo,o.fromWhere,o.toWhere,o.adults,o.kids,o.order,o.results, ip)
])
    res = [].concat(res[0],res[1],res[2]).sort()
    switch(o.order){
        case "dateAsc":
            res = res.sort((a, b) => (a.timeFrom < b.timeFrom) ? -1 : (a.timeFrom > b.timeFrom) ? 1 : 0).slice(0,o.results);
            break;
        case "priceDesc":
            res = res.sort((a, b) => (a.price < b.price) ? 1 : (a.price > b.price) ? -1 : 0).slice(0,o.results);
            break;
        case "priceAsc":
            res = res.sort((a, b) => (a.price < b.price) ? -1 : (a.price > b.price) ? 1 : 0).slice(0,o.results);
            break;
        }
        console.log(`[For: ${ip}] Best ${res.length} results sorted.`)
        console.log(`[For: ${ip}] Done!`)
        return res;
}
/**
 * @description Wyświetla oferty wycieczek samolotem z biur podróży TUI i Itaka zgodnie z podanymi kryteriami w konsoli oraz podaje czas zbierania danych
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
async function testGetOffers(options){
    let o = {dateFrom: "", dateTo: "", fromWhere: [], toWhere: [], adults: 1, kids: [], order: "dateAsc", results: 30}
    extend(true,o,options)
    let diagStart = new Date();
        tui.getOffers(o.dateFrom,o.dateTo,o.fromWhere,o.toWhere,o.adults,o.kids,o.order,o.results).then(e=>{console.log(e);console.log(e.length);console.log("Query took "+(((new Date()).getTime()-diagStart.getTime())/1000)+" seconds")});
      itaka.getOffers(o.dateFrom,o.dateTo,o.fromWhere,o.toWhere,o.adults,o.kids,o.order,o.results).then(e=>{console.log(e);console.log(e.length);console.log("Query took "+(((new Date()).getTime()-diagStart.getTime())/1000)+" seconds")});
    rainbow.getOffers(o.dateFrom,o.dateTo,o.fromWhere,o.toWhere,o.adults,o.kids,o.order,o.results).then(e=>{console.log(e);console.log(e.length);console.log("Query took "+(((new Date()).getTime()-diagStart.getTime())/1000)+" seconds")});
}


module.exports = {
    getOffers, testGetOffers, tui, itaka, rainbow
}