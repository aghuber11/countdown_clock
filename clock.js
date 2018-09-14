/*
Calculate the time remaining
============================
Receiving the variable deadline. This function parses both the endtime and the current time and returns them.
VARS BEING PASSED
Deadline - line 56
*/
function calculateRemainingTime(endtime) {
  var time = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((time / 1000) % 60);
  var minutes = Math.floor((time / 1000 / 60) % 60);
  var hours = Math.floor((time / (1000 * 60 * 60)) % 24);
  var days = Math.floor(time / (1000 * 60 * 60 * 24));
  return {
    'total': time,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

/*
Initialize clock
================
This is the initial function that runs. It accepts param 'clockdiv' and the var deadline from line 55 / 56
This function will loop top to bottom if the condition t.total is not equal to 0 (when local time is the same as the deadline).
when time.total is equal to 0 we clear the interval so the clock stops counting down
*/
function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');
  function updateClock() {
    var time = calculateRemainingTime(endtime);

    daysSpan.innerHTML = time.days;
    hoursSpan.innerHTML = ('0' + time.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + time.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + time.seconds).slice(-2);

    if (time.total <= 0) {
      clearInterval(timeinterval);
      let clock1 = document.getElementById("clock_h1");
      let transition = document.getElementById('clockdiv');
      clock1.innerHTML = "Time's up!";
      transition.style.visibility = "hidden";
      transition.style.opacity = "0";
    }
  }
  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

// Set the date on the below line. This parses the date provided and sends it for use in calculateRemainingTime (line 8)
//DOCUMENTATION FOR DATE OBJECT
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
var deadline = new Date(Date.parse(new Date("September 31, 2018 11:30:00")));
initializeClock('clockdiv', deadline);
