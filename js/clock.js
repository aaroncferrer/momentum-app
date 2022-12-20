const clock = document.querySelector('.clock')

function displayClock(){
    // Default behavior of time is in 24-hour format.
    const date = new Date();
    let hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    // Setting the period between AM/PM
    if(hours >= 12){
        period = 'PM';
    } else {
        period = 'AM';
    }
    document.querySelector('.period').innerHTML = period;

    // Setting the 12-hour clock-format
    let formatValue = formatSwitchBtn.getAttribute('data-format');

    if(formatValue === '12'){
        hours = String(date.getHours() % 12).padStart(2, '0')
    }

    clock.innerText = `${hours}:${minutes}:${seconds}`
}

let updateClock = setInterval(displayClock, 1000)

// ------> Getting Date
const date = new Date();
const dayNumber = date.getDate();
const year = date.getFullYear();
const dayName = date.toLocaleDateString('default', {weekday: "long"});
const month = date.toLocaleDateString('default', {month: "short"});

document.querySelector('.month-name').innerHTML = month;
document.querySelector('.day-name').innerHTML = dayName;
document.querySelector('.day-number').innerHTML = dayNumber;
document.querySelector('.year').innerHTML = year;


// ------> Switch Clock Format
const formatSwitchBtn = document.querySelector('.switch-btn');

formatSwitchBtn.addEventListener('click', () => {
    formatSwitchBtn.classList.toggle('active');

    let formatValue = formatSwitchBtn.getAttribute('data-format');

    if(formatValue === '12'){
        formatSwitchBtn.setAttribute('data-format', '24')
    } else {
        formatSwitchBtn.setAttribute('data-format', '12')
    }
})

// Toggle Button for Switch Clock Format
const clockMenuBtn = document.querySelector('.clock-menu-btn')
const clockMenu = document.querySelector('.clock-menu')

clockMenuBtn.addEventListener('click', () => {
    clockMenu.classList.toggle('active');
})

// Remove the toggle for clock-format on mouse click.
document.addEventListener('click', (event) => {
    if(event.target.id !== 'active-menu'){
        clockMenu.classList.remove('active');
    }
})
