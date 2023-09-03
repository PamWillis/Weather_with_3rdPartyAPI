

$(function () { //wrapped code

    console.log("hello")

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



        // });

        // after location entered find longitude and latitude and store in local storage

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
    weatherContainer = document.getElementbyId('weatherContainer')
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
                    let weather = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=6b4ca00374934fe246239d7d68073141`;

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
                                var temp = forecastData[i].main.temp;
                                var wind = forecastData[i].wind.speed;
                                var humidity = forecastData[i].main.pressure;
                                console.log(date, icon, temp, wind, humidity);
                                var combineElements = [date, icon, temp, wind, humidity]
                                console.log(combineElements)
                                if (i === 0) {
                                    for (x = 0; x <= combineElements.length; x++) {
                                        if (x === 0) {
                                            var divEl = document.createElement("div");  
                                            var date = dayjs.unix(forecastData[i].dt).format('MM/DD/YYYY');
                                            $('.theDay').text(date);
                                            card.appendChild(divEl);
                                            divEl.className = ("cardType");
                                        }

                                        // else if (x === 1) {
                                        //     var divEl = document.createElement("div");
                                        //     $('.theDay').text(icon);
                                        //     card.append(divEl);
                                        // }
                                        //     // add class icon
                                        // }
                                        // else if (x===2) {
                                        //     var divEl = document.createElement("div");
                                        //     $('.theDay').text(temp);
                                        //     card.append(divEl);
                                        //     // add class temp/convert to fahrenheit(imperial)
                                        // }
                                        // else if (x===3) {
                                        //     var divEl = document.createElement("div");
                                        //     $('.theDay').text(wind);
                                        //     card.append(divEl);
                                        //     // add class wind
                                        // }
                                        // else {
                                        //     var divEl = document.createElement("div");
                                        //     $('.theDay').text(humidity);
                                        //     card.append(divEl);
                                        //     // add class humidity
                                        // }
                                    }


                                    // document.getElementById("div").textContent = "date";


                                }
                                // else if (i === 7) {

                                // }
                            }

                        });
                });
            });

    }
})