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

    $('.offer-template').clone().innerHTML // to jest kopiowanie szablonu dla oferty, możesz sobie przypisać go do zmiennej i wykonywać na nim .querySelector().innerHTML="wartość", aby zmieniać wartości jego elementów (nie jestem pewien czy zadziała, ale na 80% powinno)

    return false;
}
