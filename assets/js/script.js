// event listener for entering location and creating card
$('.search').on('click', function (e) {
    e.preventDefault();
    var town = document.getElementById('cityLoc').value.trim();
    emptyArray.push(town);
    localStorage.setItem("myCity", JSON.stringify(emptyArray));
    var buttonEl = document.createElement("button");
    buttonEl.textContent = town;
    buttonEl.classList.add("btn");
    $('.container').append(buttonEl);

    if (theTownLoc !== '') {
        //if loc clear current and create first card, same for week (weatherContainer)
        const clearCurrent = document.getElementById("firstCard");
        while (clearCurrent.lastElementChild) {
            clearCurrent.removeChild(clearCurrent.lastElementChild);
        }
        const clearWeek = document.getElementById("weatherContainer");
        while (clearWeek.lastElementChild) {
            clearWeek.removeChild(clearWeek.lastElementChild);
        }
    }
    // Assuming theTownLoc returns a Promise
    theTownLoc(town)
});

var emptyArray = [];

//create array of towns
function renderSearchHistory() {
    var localCity = JSON.parse(localStorage.getItem('myCity'));

    console.log("that" + localCity);

    for (i = 0; i < localCity.length; i++) { // Update the loop to use localCity instead of emptyArray
        var buttonEl = document.createElement("button");
        buttonEl.textContent = localCity[i];
        buttonEl.classList.add("btn");
        document.querySelector('.container').append(buttonEl);
    }
}

// finds longitude and latidue
function theTownLoc(town) {
    var theTown = localStorage.getItem('myCity');
    var theLocation = JSON.parse(theTown)
    let coordinates = `https://api.openweathermap.org/geo/1.0/direct?q=${town}&limit=1&appid=${apiKey}`;

    fetch(coordinates)
        .then(function (responseCoor) {
            console.log(responseCoor);
            return responseCoor.json() //getting info and creating object with properties
        })
        .then(function (cityCoordinates) {
            console.log(cityCoordinates);
            //pull lat and lon from array
            cityCoordinates.forEach((object) => {
                let lat = object.lat;
                let lon = object.lon;
                let weather = `https://api.openweathermap.org/data/2.5/forecast?&units=imperial&lat=${lat}&lon=${lon}&appid=${apiKey}`;
                //fetch weather using lat and lon
                fetch(weather)
                    .then(function (responseWe) {
                        // console.log(responseWe);
                        return responseWe.json(); //getting info and creating object with properties
                    })
                    .then(function (localWeather) {
                        // console.log(localWeather);
                        var forecastData = localWeather.list

                        for (let i = 1; i < forecastData.length - 1; i += 7) {
                            console.log(i);
                            // var date = forecastData[i].dt;
                            var icon = forecastData[i].weather[0].icon;
                            var iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;
                            // console.log(iconUrl);
                            var temp = (forecastData[i].main.temp);
                            var wind = (forecastData[i].wind.speed);
                            var humidity = forecastData[i].main.humidity;
                            const hour = dayjs.unix(forecastData[i].dt).format('h');
                            console.log("the" + hour)

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
                                const dateText = document.createTextNode(town + ' (' + date + ')');
                                cityDateIcon.classList.add("HeadListCard1");
                                cityDateIcon.appendChild(dateText);
                                //icon
                                const iconImageSm = document.createElement("img");
                                currentList.append(iconImageSm);
                                iconImageSm.setAttribute('src', iconUrl);
                                cityDateIcon.classList.add("iconCard1");

                                //TEMP
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
                            if (i > 6) {
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

                                //TEMP
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