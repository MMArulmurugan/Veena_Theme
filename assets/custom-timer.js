var timer;
let dayElement = document.getElementById("days");
let hoursElement = document.getElementById("hours");
let minutesElement = document.getElementById("minutes");
let secondsElement = document.getElementById("seconds");
var compareDate = new Date();
compareDate.setDate(compareDate.getDate() + 183); 

timer = setInterval(function() {
  timeBetweenDates(compareDate);
}, 1000);

function timeBetweenDates(toDate) {
  var now = new Date();
  var difference = toDate.getTime() - now.getTime();

  if (difference <= 0) {
    clearInterval(timer);
  
  } else {
    
    var seconds = Math.floor(difference / 1000) % 60;
    var minutes = Math.floor(difference / (1000 * 60)) % 60;
    var hours = Math.floor(difference / (1000 * 60 * 60)) % 24;
    var days = Math.floor(difference / (1000 * 60 * 60 * 24));

    dayElement.textContent = days;
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;
  }
}
