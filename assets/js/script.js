

$(function () { //wrapped code

    // dayjs.extend(window.dayjs-plugin_utc);
    // dayjs.extend(window.dayjs-plugin_timezone);


    var today = dayjs();
    var reformatDate = today.format('MMM D, YYYY');
    $('lead').text(today.format('MMM D, YYYY'));

    $('lead').text(today.format('MMM D, YYYY'));
    document.getElementById("currentDay").innerHTML = (reformatDate);
    //console.log(reformatDate)

    // event listener for entering location
    $('.search').on('click', function (e) {
        //     //the time of the div class
        //added preventDefault
        e.preventDefault();
        //added console.log to make sure click was working
        console.log("im clicked")
        var town = document.getElementById('cityLoc').value.trim();

        localStorage.setItem("myCity", JSON.stringify(town));
        if (town !== '') {

            renderSearchHistory();

        };
        theTownLoc();
        console.log(theTownLoc);

    });

    function renderSearchHistory() {
        var localCity = localStorage.getItem('myCity');
        console.log(localCity);
        //create button
        var buttonEl = document.createElement("button")
        $('.container').append(buttonEl)
        //add text and style to button
        buttonEl.textContent = JSON.parse(localCity);
        buttonEl.classList.add("btn");
    }

    // finds longitude and latidue
    function theTownLoc() {
        var theTown = localStorage.getItem('myCity');
        var theLocation = JSON.parse(theTown)
        console.log("theTownvar" + theTown);
        let coordinates = `http://api.openweathermap.org/geo/1.0/direct?q=${theLocation}&limit=1&appid=6b4ca00374934fe246239d7d68073141`

        fetch(coordinates)
            .then(function (responseCoor) {
                console.log(responseCoor);
                return responseCoor.json() //getting info and creating object with properties
            })
            .then(function (cityCoordinates) {
                //pull lat and lon from array
                cityCoordinates.forEach((object) => {
                    console.log(object.lat);
                    console.log(object.lon);
                    let lat = object.lat;
                    let lon = object.lon;
                    let weather = `http://api.openweathermap.org/data/2.5/forecast?&units=imperial&lat=${lat}&lon=${lon}&appid=6b4ca00374934fe246239d7d68073141`;

                    fetch(weather)
                        .then(function (responseWe) {
                            console.log(responseWe);
                            return responseWe.json(); //getting info and creating object with properties
                        })
                        .then(function (localWeather) {
                            console.log(localWeather);
                            var forecastData = localWeather.list


                            for (let i = 0; i < forecastData.length - 1; i += 8) {
                                var date = forecastData[i].dt;
                                var icon = forecastData[i].weather[0].icon;
                                var iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;
                                console.log(iconUrl);
                                var temp = (forecastData[i].main.temp);
                                var wind = (forecastData[i].wind.speed);
                                var humidity = forecastData[i].main.humidity;

                                console.log(date, icon, temp, wind, humidity);

                                //Just creating card
                                if (i < 41) {
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
})