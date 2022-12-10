function showClock(){
    const date = new Date();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Setting the period between AM/PM
    if(hours >= 12){
        period = 'PM';
    } else {
        period = 'AM';
    }

    // Setting the 12-hour clock-format
    const hours2 = date.getHours() % 12 || 12;

    document.querySelector('.hours').innerHTML = hours;
    document.querySelector('.minutes').innerHTML = minutes;
    document.querySelector('.seconds').innerHTML = seconds;
    document.querySelector('.period').innerHTML = period;
}

let updateClock = setInterval(showClock, 1000)