async function getOffers(dateFrom, dateTo, fromWhere, toWhere, adults, kids, transport, order, results){

    if(dateFrom!=""){
        // let _dateFrom = new Date(dateFrom);
        let _dateFrom = new Date(dateFrom) < new Date() ? new Date() : new Date(dateFrom);
        console.log(`:startDate:${("0"+_dateFrom.getDate()).slice(-2)}.${("0"+(_dateFrom.getMonth()+1)).slice(-2)}.${_dateFrom.getFullYear()}`)
    }
    
    if(dateTo!=""){
        let _dateTo = new Date(dateTo);
        console.log(`:endDate:=${("0"+_dateTo.getDate()).slice(-2)}.${("0"+(_dateTo.getMonth()+1)).slice(-2)}.${_dateTo.getFullYear()}`)
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
        console.log(":c:"+destinations.join(":c:"));
    }
}

console.log("Zaimportowano skrypt dla biura podrozy TUI")
module.exports = {
    getOffers
}