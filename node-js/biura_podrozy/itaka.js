async function getOffers(dateFrom, dateTo, fromWhere, toWhere, adults, kids, transport, order, results){
    
    if(dateFrom!=""){
        // let _dateFrom = new Date(dateFrom);
        let _dateFrom = new Date(dateFrom) < new Date() ? new Date() : new Date(dateFrom);
        console.log(`&date-from=${_dateFrom.getFullYear()}-${("0"+(_dateFrom.getMonth()+1)).slice(-2)}-${("0"+_dateFrom.getDate()).slice(-2)}`)
    }
    if(dateTo!=""){
        let _dateTo = new Date(dateTo);
        console.log(`&date-to=${_dateTo.getFullYear()}-${("0"+(_dateTo.getMonth()+1)).slice(-2)}-${("0"+_dateTo.getDate()).slice(-2)}`)
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
        console.log("&dest-region="+destinations.join(","));
    }
}

console.log("Zaimportowano skrypt dla biura podrozy Itaka")
module.exports = {
    getOffers
}