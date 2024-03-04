var targetDate = new Date(document.querySelector('.custom-timer__time-wrapper').dataset.targetDate).getTime();
  var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = targetDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById('days').innerText = formatTime(days);
    document.getElementById('hours').innerText = formatTime(hours);
    document.getElementById('minutes').innerText = formatTime(minutes);
    document.getElementById('seconds').innerText = formatTime(seconds);
  }, 1000);
  function formatTime(time) {
    return time < 10 ? '0' + time : time;
  }