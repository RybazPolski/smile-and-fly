const rainbow = require("./rainbow")
const tui = require("./tui")
const itaka = require("./itaka");

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
async function getOffers(dateFrom = "", dateTo = "", fromWhere = [], toWhere = [], adults = 1, kids = [], order="dateAsc", results=30){
    let res = await Promise.all([
        tui.getOffers(dateFrom,dateTo,fromWhere,toWhere,adults,kids,order,Math.floor(results)),
        itaka.getOffers(dateFrom,dateTo,fromWhere,toWhere,adults,kids,order,Math.ceil(results))
    ])
    res = [].concat(res[0],res[1]).sort()
    switch(order){
        case "dateAsc":
            return res.sort((a, b) => (a.timeFrom < b.timeFrom) ? -1 : (a.timeFrom > b.timeFrom) ? 1 : 0).slice(0,results);
        case "priceDesc":
            return res.sort((a, b) => (a.price < b.price) ? 1 : (a.price > b.price) ? -1 : 0).slice(0,results);
        case "priceAsc":
            return res.sort((a, b) => (a.price < b.price) ? -1 : (a.price > b.price) ? 1 : 0).slice(0,results);
    }
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
async function testGetOffers(dateFrom = "", dateTo = "", fromWhere = [], toWhere = [], adults = 1, kids = [], order="dateAsc", results=30){
    let diagStart = new Date();
    tui.getOffers(dateFrom,dateTo,fromWhere,toWhere,adults,kids,order,Math.floor(results)).then(e=>{console.log(e);console.log(e.length);console.log("Query took "+(((new Date()).getTime()-diagStart.getTime())/1000)+" seconds")});
    itaka.getOffers(dateFrom,dateTo,fromWhere,toWhere,adults,kids,order,Math.ceil(results)).then(e=>{console.log(e);console.log(e.length);console.log("Query took "+(((new Date()).getTime()-diagStart.getTime())/1000)+" seconds")});
}

module.exports = {
    getOffers, testGetOffers, tui, itaka 
}