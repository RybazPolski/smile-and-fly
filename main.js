function addBirthFields(){
    let kidsCount = parseInt(document.getElementById('kids').value)
    if(kidsCount){
        document.getElementById('kidsBirthsHeader').innerHTML = "Daty urodzenia dzieci:"
    }else{
        document.getElementById('kidsBirthsHeader').innerHTML = ""
    }
    let currentFieldsCount = document.getElementById('kidsBirths').querySelectorAll('input').length;
    if(currentFieldsCount < kidsCount){
        for(let i=currentFieldsCount; i<kidsCount;i++){
            let newInput = document.createElement('input')
            newInput.setAttribute('class','kidBirth')
            newInput.setAttribute('type','date')
            document.getElementById('kidsBirths').appendChild(newInput)
        }
    }else{
        while(document.getElementById('kidsBirths').querySelectorAll('input').length > kidsCount){
            document.getElementById('kidsBirths').removeChild(document.getElementById('kidsBirths').lastChild)
        }
    }    
}addBirthFields()


// Dla Piotra 👇
form = document.querySelector('.formularz')
form.onsubmit = function(event) {
    event.preventDefault();

// to sprawia że form nie zachowa się jak domyślnie, czyli nie odświeży strony
// poniżej zbierz dane z pól forma i dodaj do obiektu (travelData) jeżeli nie są puste 



    
    
    return false;
}

function searchOffers(){
    document.querySelector('.oferty').innerHTML="<img style='width:49vw; height:20vw; margin-left:3%;object-position:center; object-fit:contain;' src='https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831'>"

    var travelData = {};
    if(form.dateFrom.value != ""){travelData.dateFrom = form.dateFrom.value};
    if(form.dateTo.value != ""){travelData.dateTo = form.dateTo.value};
    if(form.fromWhere.value != ""){travelData.fromWhere = [form.fromWhere.value]};
    if(form.toWhere.value != ""){travelData.toWhere = [form.toWhere.value]};
    if(form.adults.value != ""){travelData.adults = form.adults.value};
    if(form.results.value != ""){travelData.results = form.results.value};
    if(form.order.value != ""){travelData.order = form.order.value};
    let kidsBirths = new Array()
    for(var el of document.getElementsByClassName('kidsBirths')){
        kidsBirths.push(el.value)
    }
    travelData.kids = kidsBirths
    console.log(travelData)

$.ajax({
      url: "http://localhost:8888", //adres uruchomionego API
      type: "GET",
      data: travelData,
      success: function (data) {
          let result = $.parseJSON(data)
        //   console.log(result)
          if(result.error){
              // obsługa błędu
            querySelector('.oferty').innerHTML="<h1>Błąd serwera!</h1>"
            console.log(result.error)
          }else if(result.length==0){
            querySelector('.oferty').innerHTML="<h1>Nie znaleziono ofert!</h1>"
          }else{
            document.querySelector('.oferty').innerHTML=""
            let i = 0
            let options = {year: 'numeric', month: 'numeric', day: 'numeric'}
              for(let el of result){
                console.log(el)
                var offer = $('#oferta-template > .oferta').clone(); 
                $('.oferty').append(offer)
                document.querySelector('.oferty').querySelectorAll('.oferta')[i].querySelector('#tytul').innerHTML = el.title
                document.querySelector('.oferty').querySelectorAll('.oferta')[i].querySelector('#lokalizacja').innerHTML = el.location
                document.querySelector('.oferty').querySelectorAll('.oferta')[i].querySelector('#wyzywienie').innerHTML = el.food
                document.querySelector('.oferty').querySelectorAll('.oferta')[i].querySelector('#cenaZobnizka').innerHTML = el.oldPrice==null?"":el.oldPrice+"zł/os"
                document.querySelector('.oferty').querySelectorAll('.oferta')[i].querySelector('#cenaZaOs').innerHTML = el.price+"zł/os"
                document.querySelector('.oferty').querySelectorAll('.oferta')[i].querySelector('#termin').innerHTML = `${new Date(el.timeFrom).toLocaleString('pl-PL', options)} - ${new Date(el.timeTo).toLocaleString('pl-PL',options)}`
                document.querySelector('.oferty').querySelectorAll('.oferta')[i].querySelector('#gwiazdki').innerHTML = ""
                for(let j = 1;j<=el.stars;j++){
                    document.querySelector('.oferty').querySelectorAll('.oferta')[i].querySelector('#gwiazdki').innerHTML += "&#11088;"
                }
                document.querySelector('.oferty').querySelectorAll('.oferta')[i].querySelector('#link').href = el.offerLink
                document.querySelector('.oferty').querySelectorAll('.oferta')[i].querySelector('#image').src = el.imageLink

                i++
              }
          }
      }
})
}
//https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831