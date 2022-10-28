# Wyszukiwarka ofert poprzez biura podróży - bot zdalny
## Jak postawić serwer?
### Windows / Linux
#### Wymagania:
- git
- node-js

Klonowanie repozytorium
```console
git clone https://github.com/julianrybarczyk/smile-and-fly
```

Instalacja node-modules
```console
cd <SciezkaDoSklonowanegoRepo>/node-js
npm i
```

Uruchomienie serwera
```console
cd <SciezkaDoSklonowanegoRepo>/node-js
node app.js
```
###### Domyślny port API to *:8888*, jednak można go zmienić w skrypcie *node-js/app.js*
Jeżeli serwer po uruchomieniu nie działa, należy znaleźć rozwiązanie pod adresem https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md 

---
## Jak korzystać z API?
### AJAX
```js
var travelData = //zmienna dla opcji (wszystkie są opcjonalne, poniżej zaprezentowano domyślne.) 
{ 
  dateFrom: "", //Od kiedy? || data w formacie yyyy-mm-dd (pusta - dowolne)
  dateTo: "", //Do kiedy? || data w formacie yyyy-mm-dd (pusta - dowolne)
  fromWhere: [], //Skąd? || tablica kodów lotnisk, wymienionych poniżej (puste - dowolne)
  toWhere: [], //Dokąd? || tablica kodów państw i regionów, wymienionych poniżej (puste - dowolne)
  adults: 1, //Ilość dorosłych || liczba całkowita
  kids: [], //Daty urodzenia dzieci || tablica dat urodzenia każdego z dzieci, w formacie yyyy-mm-dd (np. dla 2 dzieci podajemy 2 daty.)
  order:"dateAsc", //Sortowanie || dateAsc - najbliższa data; priceAsc - cena rosnąco; priceDesc - cena malejąco
  results:30 //Ilość wyników jakie chcemy uzyskać || liczba całkowita (Pamiętaj - w zależności od ilości wyników, czas zbierania ofert może się wydłużyć.)
}

$.ajax({
      url: "http://localhost:8888", //adres uruchomionego API
      type: "GET",
      data: travelData,
      success: function (data) {
          let result = $.parseJSON(data)
          console.log(result)
          if(result.error){
              // obsługa błędu
              console.log(result.error)
          }else{
              //obsługa uzyskanych wyników
              console.log("Success!")
          }
      }
})
```

Przykładowy **result**:
```js
[
  {
      "travelAgency": "TUI",
      "title": "Villa Rustica Dalmatia",
      "stars": 4,
      "location": "CHORWACJA / DALMACJA ŚRODKOWA / SEGET VRANJICA",
      "price": 326345,
      "oldPrice": null,
      "timeFrom": 1685577600000,
      "timeTo": 1686182400000,
      "food": "Śniadanie",
      "offerLink": "https://www.tui.pl/wypoczynek/chorwacja/dalmacja-srodkowa/villa-rustica-dalmatia-spu23001/OfferCodeWS/WAWSPU20230601104020230601202306081330L07SPU23001YGRGA01ROGYGRA01",
      "imageLink": "https://r.cdn.redgalaxy.com/scale/o2/TUI/hotels/SPU23001/S22/19348639.jpg?dstw=1200&dsth=1191.044776119403&srcw=268&srch=266&srcx=1%2F2&srcy=1%2F2&srcmode=3&type=1&quality=80"
  },
  ... //pozostałe elementy
]
```

---
### Kody polskich lotnisk wylotu:
| LOTNISKO          | KOD |
|-------------------|-----|
| Bydgoszcz         | BZG |
| Gdańsk            | GDN |
| Katowice          | KTW |
| Kraków            | KRK |
| Lublin            | LUZ |
| Łódź              | LCJ |
| Poznań            | POZ |
| Szczecin          | SZZ |
| Warszawa Chopin   | WAW |
| Warszawa Modlin   | WMI |
| Wrocław           | WRO |
| Rzeszów           | RZE |
| Zielona Góra      | ZLG |

---

### Kody regionów docelowych:
| PAŃSTWO    | REGION                           |   KOD   |
|------------|----------------------------------|:-------:|
| Dominikana | [Cała Dominikana]                |   dom   |
| Dominikana | Puerto Plata                     | dom-pue |
| Dominikana | Samana                           | dom-sam |
| Egipt      | [Cały Egipt]                     |   egi   |
| Egipt      | Hurghada                         | egi-hur |
| Egipt      | Marsa Alam                       | egi-mar |
| Egipt      | Sharm el Sheikh                  | egi-sha |
| Egipt      | Taba                             | egi-tab |
| Grecja     | [Cała Grecja]                    |   gre   |
| Grecja     | Attyka i Evia                    | gre-aie |
| Grecja     | Chalkidiki                       | gre-cha |
| Grecja     | Kasandra                         | gre-kas |
| Grecja     | Kefalonia                        | gre-kef |
| Grecja     | Kokkino Nero                     | gre-kok |
| Grecja     | Korfu                            | gre-kor |
| Grecja     | Kos                              | gre-kos |
| Grecja     | Kreta                            | gre-kre |
| Grecja     | Lefkada                          | gre-lef |
| Grecja     | Lesbos                           | gre-les |
| Grecja     | Mykonos                          | gre-myk |
| Grecja     | Naxos                            | gre-nax |
| Grecja     | Peloponez                        | gre-pel |
| Grecja     | Riwiera Ateńska                  | gre-ria |
| Grecja     | Riwiera Olimpijska               | gre-rio |
| Grecja     | Rodos                            | gre-rod |
| Grecja     | Samos                            | gre-sam |
| Grecja     | Santorini                        | gre-san |
| Grecja     | Thassos                          | gre-tha |
| Grecja     | Zakynthos                        | gre-zak |
| Hiszpania  | [Cała Hiszpania]                 |   his   |
| Hiszpania  | Almeria                          | his-alm |
| Hiszpania  | Costa Almeria                    | his-cal |
| Hiszpania  | Costa Barcelona                  | his-cba |
| Hiszpania  | Costa Blanca                     | his-cbl |
| Hiszpania  | Costa Brava                      | his-cbr |
| Hiszpania  | Costa de la Luz                  | his-cdl |
| Hiszpania  | Costa del Marasame               | his-cdm |
| Hiszpania  | Costa Dorada                     | his-cdo |
| Hiszpania  | Costa del Sol                    | his-cds |
| Hiszpania  | Formentera                       | his-for |
| Hiszpania  | Fuerteventura                    | his-fue |
| Hiszpania  | Gran Canaria                     | his-gra |
| Hiszpania  | Ibiza                            | his-ibi |
| Hiszpania  | Prowincja Madryt                 | his-mad |
| Hiszpania  | Majorka                          | his-maj |
| Hiszpania  | Minorka                          | his-min |
| Hiszpania  | Teneryfa                         | his-ten |
| Hiszpania  | Wybrzeże Kadyksu i Costa Ballena | his-wyb |
| Meksyk     | [Cały Meksyk]                    |   mek   |
| Meksyk     | Canun                            | mek-can |
| Meksyk     | Jukatan                          | mek-juk |
| Meksyk     | Riviera Maya                     | mek-riv |
| Turcja     | [Cała Turcja]                    |   tur   |
| Turcja     | Alanya                           | tur-ala |
| Turcja     | Antalya                          | tur-ant |
| Turcja     | Belek                            | tur-bel |
| Turcja     | Bodrum                           | tur-bod |
| Turcja     | Didyma                           | tur-did |
| Turcja     | Finike                           | tur-fin |
| Turcja     | Kemer                            | tur-kem |
| Turcja     | Kusadasi                         | tur-kus |
| Turcja     | Mamaris                          | tur-mam |
| Turcja     | Riwiera Egejska                  | tur-reg |
| Turcja     | Riwiera Turecka                  | tur-rtu |
| Turcja     | Side                             | tur-sid |
| Turcja     | Stambuł                          | tur-sta |

