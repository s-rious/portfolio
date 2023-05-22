function currentTime() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let ampm = "AM";

    if (hours == 0) {
        hours = 12;
    }
    if (hours > 12) {
        hours = hours - 12;
        ampm = "PM";
    }

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    let time = hours + ":" + minutes + ":" + seconds + " " + ampm;


    let dayNum = date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear();
    let days = date.getDate();

    if (dayNum == 0) {
        day = "Sunday";
    }
    else if (dayNum == 1) {
        day = "Monday";
    }
    else if (dayNum == 2) {
        day = "Tuesday";
    }
    else if (dayNum == 3) {
        day = "Wednesday";
    }
    else if (dayNum == 4) {
        day = "Thursday";
    }
    else if (dayNum == 5) {
        day = "Friday";
    }
    else if (dayNum == 6) {
        day = "Saturday";
    }
    else {
        day = "Error";
    }

    if (month == 0) {
        month = "January";
    }
    else if (month == 1) {
        month = "February";
    }
    else if (month == 2) {
        month = "March";
    }
    else if (month == 3) {
        month = "April";
    }
    else if (month == 4) {
        month = "May";
    }
    else if (month == 5) {
        month = "June";
    }
    else if (month == 6) {
        month = "July";
    }
    else if (month == 7) {
        month = "August";
    }
    else if (month == 8) {
        month = "September";
    }
    else if (month == 9) {
        month = "October";
    }
    else if (month == 10) {
        month = "November";
    }
    else if (month == 11) {
        month = "December";
    }
    else {
        day = "Error";
    }

    if (days == 1)(abbrev = "st");
    if (days == 2)(abbrev = "nd");
    if (days == 3)(abbrev = "rd");
    if (days == 21)(abbrev = "st");
    if (days == 22)(abbrev = "nd");
    if (days == 23)(abbrev = "rd");
    if (days == 31)(abbrev = "st");
    if (days > 3 || days < 21 || days > 23){abbrev = "th"};
    dayNum += abbrev;

    let datePrint = day + ", " + month + " " + dayNum + ", " + year;

    document.getElementById("clock").innerHTML = time;
    document.getElementById("date").innerHTML = datePrint;
    let t = setTimeout(function () { currentTime() }, 1000);
}
currentTime();