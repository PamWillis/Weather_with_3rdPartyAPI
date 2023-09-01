

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




    // example given in email:

    // {"coord":{"lon":-0.1257,"lat":51.5085},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],
    // "base":"stations","main":{"temp":292.79,"feels_like":292.4,"temp_min":291.54,"temp_max":294.17,"pressure":1012,"humidity":61},
    // "visibility":10000,"wind":{"speed":3.09,"deg":0},"clouds":{"all":75},"dt":1693228000,"sys":
    // {"type":2,"id":2075535,"country":"GB","sunrise":1693199174,"sunset":1693249077},
    // "timezone":3600,"id":2643743,"name":"London","cod":200}

    //call for code for location
    // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}


    //finds weather related for that longitude and latitude


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
                cityCoordinates.forEach(object => {
                    console.log(object.lat);
                    console.log(object.lon);
                   
                });
            })



        //need to swap out coordinates each time there is an entry after running thru example2

        let weather = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=6b4ca00374934fe246239d7d68073141`

        fetch(weather)
            .then(function (responseWe) {
                console.log(responseWe);
                return responseWe.json()  //getting info and creating object with properties

            })
            .then(function (localWeather) {
                console.log(localWeather)
            })
    }
});