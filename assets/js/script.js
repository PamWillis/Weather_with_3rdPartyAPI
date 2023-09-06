



// dayjs.extend(window.dayjs-plugin_utc);
// dayjs.extend(window.dayjs-plugin_timezone);


// event listener for entering location
$('.search').on('click', function (e) {
    //     //the time of the div class
    //added preventDefault
    e.preventDefault();
    //added console.log to make sure click was working
    // console.log("im clicked")
    var town = document.getElementById('cityLoc').value.trim();
    emptyArray.push(town);
    localStorage.setItem("myCity", JSON.stringify(emptyArray));
    var buttonEl = document.createElement("button")
    buttonEl.textContent = town;
    buttonEl.classList.add("btn");
    $('.container').append(buttonEl)

    if (theTownLoc !== '') {
        const clearCurrent = document.getElementById("firstCard");
        while (clearCurrent.lastElementChild) {
            clearCurrent.removeChild(clearCurrent.lastElementChild);
        }
        const clearWeek = document.getElementById("weatherContainer");
        while (clearWeek.lastElementChild) {
            clearWeek.removeChild(clearWeek.lastElementChild);
        }
    }

    theTownLoc();



});

var emptyArray = [];

function renderSearchHistory() {
    var localCity = JSON.parse(localStorage.getItem('myCity'));

    console.log("that" + localCity);

    for (i = 0; i < emptyArray.length; i++) {
        var buttonEl = document.createElement("button")
        buttonEl.textContent = emptyArray[i];
        buttonEl.classList.add("btn");
        document.querySelector('.container').append(buttonEl)

    }
}

// finds longitude and latidue
function theTownLoc() {
    var theTown = localStorage.getItem('myCity');
    var theLocation = JSON.parse(theTown)
    // console.log("theTown" + theTown);
    // console.log(theLocation);
    let coordinates = `http://api.openweathermap.org/geo/1.0/direct?q=${theLocation}&limit=1&appid=6b4ca00374934fe246239d7d68073141`

    fetch(coordinates)
        .then(function (responseCoor) {
            // console.log(responseCoor);
            return responseCoor.json() //getting info and creating object with properties
        })
        .then(function (cityCoordinates) {
            //pull lat and lon from array
            cityCoordinates.forEach((object) => {
                // console.log(object.lat);
                // console.log(object.lon);


                let lat = object.lat;
                let lon = object.lon;
                let weather = `http://api.openweathermap.org/data/2.5/forecast?&units=imperial&lat=${lat}&lon=${lon}&appid=6b4ca00374934fe246239d7d68073141`;

                fetch(weather)
                    .then(function (responseWe) {
                        // console.log(responseWe);
                        return responseWe.json(); //getting info and creating object with properties
                    })
                    .then(function (localWeather) {
                        // console.log(localWeather);
                        var forecastData = localWeather.list

                        //create empty array to be replaced each time new city is entered
                        // var emptyWeather = [];

                        for (let i = 0; i < forecastData.length - 1; i += 8) {
                            var date = forecastData[i].dt;
                            // var startDt =dayjs().add(1, 'day').startOf('day').uix();
                            // var endDt =dayjs().add(6, 'day').startOf('day').unix();


                            var icon = forecastData[i].weather[0].icon;
                            var iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;
                            // console.log(iconUrl);
                            var temp = (forecastData[i].main.temp);
                            var wind = (forecastData[i].wind.speed);
                            var humidity = forecastData[i].main.humidity;

                            // console.log(date, icon, temp, wind, humidity);

                            //create current card
                            if (i < 7) {

                                const currentCardEl = document.createElement('div');
                                document.getElementById('firstCard').append(currentCardEl);
                                currentCardEl.classList.add('todaysWeather');

                                const currentList = document.createElement("ul");
                                currentCardEl.appendChild(currentList);
                                //city and date
                                const cityDateIcon = document.createElement('li');
                                currentList.appendChild(cityDateIcon);
                                const date = dayjs.unix(forecastData[i].dt).format('MM/DD/YYYY');
                                const dateText = document.createTextNode(theLocation + ' (' + date + ')');
                                cityDateIcon.classList.add("HeadListCard1");
                                cityDateIcon.appendChild(dateText);
                                //icon
                                const iconImageSm = document.createElement("img");
                                currentList.append(iconImageSm);
                                iconImageSm.setAttribute('src', iconUrl);
                                cityDateIcon.classList.add("iconCard1");

                                // //TEMP
                                const tempEl = document.createElement("li");
                                currentList.appendChild(tempEl);
                                const tempText = document.createTextNode("Temp: " + Math.round(temp) + " °F");
                                tempEl.classList.add("liListCard1");
                                tempEl.appendChild(tempText);
                                //WIND
                                const windEl = document.createElement("li");
                                currentList.appendChild(windEl);
                                const windText = document.createTextNode("Wind: " + wind + " MPH");
                                windEl.classList.add("liListCard1");
                                windEl.appendChild(windText);
                                //HUMIDITY
                                const humidityEl = document.createElement("li");
                                currentList.appendChild(humidityEl);
                                const humidityText = document.createTextNode("Humidity: " + humidity + "%");
                                humidityEl.classList.add("liListCard1");
                                humidityEl.appendChild(humidityText);
                            }


                            //Just creating card
                            if (i > 7 && i < 41) {
                                // create a div node
                                const cardEl = document.createElement("div");
                                //append the node to the element weather container
                                document.getElementById("weatherContainer").appendChild(cardEl);
                                //add class to cardEl
                                cardEl.classList.add("card");

                                // create ul for card
                                const keyList = document.createElement("ul");
                                cardEl.appendChild(keyList);
                                keyList.classList.add("ulList");
                                //DATE
                                // var startDt =dayjs().add(1, 'day').startOf('day').uix();
                                // var endDt =dayjs().add(6, 'day').startOf('day').unix();
                                const dateEl = document.createElement("li");
                                keyList.appendChild(dateEl);
                                const date = dayjs.unix(forecastData[i].dt).format('MM/DD/YYYY');
                                const dateText = document.createTextNode(date);
                                dateEl.classList.add("liList");
                                dateEl.appendChild(dateText);

                                //ICON
                                const iconEl = document.createElement("li");
                                keyList.appendChild(iconEl);
                                const iconImage = document.createElement("img");
                                iconEl.appendChild(iconImage);
                                iconImage.setAttribute('src', iconUrl);
                                iconEl.classList.add("liList");

                                // //TEMP
                                const tempEl = document.createElement("li");
                                keyList.appendChild(tempEl);
                                const tempText = document.createTextNode("Temp: " + Math.round(temp) + " °F");
                                tempEl.classList.add("liList");
                                tempEl.appendChild(tempText);
                                //WIND
                                const windEl = document.createElement("li");
                                keyList.appendChild(windEl);
                                const windText = document.createTextNode("Wind: " + wind + " MPH");
                                windEl.classList.add("liList");
                                windEl.appendChild(windText);
                                //HUMIDITY
                                const humidityEl = document.createElement("li");
                                keyList.appendChild(humidityEl);
                                const humidityText = document.createTextNode("Humidity: " + humidity + "%");
                                humidityEl.classList.add("liList");
                                humidityEl.appendChild(humidityText);


                            }






                        }
                    });
            });
        });


}


renderSearchHistory();


