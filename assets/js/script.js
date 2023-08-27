// var APIKey = "6b4ca00374934fe246239d7d68073141";

$(function () { //wrapped code


    var today = dayjs();
var reformatDate = today.format('MMM D, YYYY');
      $('lead').text(today.format('MMM D, YYYY'));
    
    $('lead').text(today.format('MMM D, YYYY'));
    document.getElementById("currentDay").innerHTML = reformatDate;
    //console.log(reformatDate)
    

   
    // event listener for entering location
    $('.search').on('click', function () {
    //     //the time of the div class
    var town = document.getElementById("cityLoc").value.trim();
    if (town !== '') {
   localStorage.setItem("myCity", JSON.stringify(town)); 

   //create a button below with city for history
  
   let entry = $(this).children('.container').val();
   //at the child want to add button
   var buttonEl = document.createElement("button")
   buttonEl.classList.add("btn")
   $('.container').append(buttonEl);
   localStorage.getItem("myCity", JSON.parse(town));
    }});
    // });
    console.log("im clicked");
    // after location entered find longitude and latitude and store in local storage





});