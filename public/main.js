let rightNow = new Date();
const month = rightNow.toLocaleString('en-US', { month: '2-digit' });
const year = rightNow.getFullYear();
const day = rightNow.toLocaleString('en-US', { day: '2-digit' });
const dateParam = year + '-' + month + '-' + day;
const currentDay = rightNow.toLocaleDateString('en-US', { weekday: 'long'});
let departParam;
let arrivalParam;

// console.log(`The current date is ${dateParam}`);
// console.log(`The time is ${rightNow.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`);

// global variable to check if a scheduled sailing has passed
let timePassed = false;

// drop down selection
const terminalsList = document.getElementById('terminals-list');
terminalsList.addEventListener('change', function() {
    renderSchedule(this.value);
});

// date picker
const datePicker = document.getElementById('date-picker');
datePicker.addEventListener('change', function() {
    console.log(this.value);
});

// terminal ID's:
// fetch(`/api/terminals/${dateParam}`)
// .then(response => response.json())
// .then(data => console.log(data));

function renderSchedule(terminals) {
    switch(terminals) {
        case '3-7':
            fetchFerries(3, 7);
            break;
        case '4-7':
            fetchFerries(4, 7);
            break;
        case '8-12':
            fetchFerries(8, 12);
            break;
        case '9-20':
            fetchFerries(9, 20);
            break;
        case '12-8':
            fetchFerries(9, 20);
            break;
        case '7-3':
            fetchFerries(9, 20);
            break;
        case '7-4':
            fetchFerries(9, 20);
            break;
        case '20-9':
            fetchFerries(9, 20);
            break;
    }
}

function fetchFerries(departingID, arrivingID) {
    fetch(`/api/${dateParam}/${departingID}/${arrivingID}`)
    .then(response => response.json())
    .then(data => {
        const message = `Departing from ${data.TerminalCombos[0].DepartingTerminalName}, arriving in ${data.TerminalCombos[0].ArrivingTerminalName} for ${currentDay}, ${month}/${day}/${year}`;
        printDate(message);
        console.log(data);
        // console.log(data.TerminalCombos[0].Times);
        // reset #ferry-times
        document.getElementById('ferry-times').innerHTML = '';
        for (let i = 0; i < data.TerminalCombos[0].Times.length; i++) {
            const arrString = data.TerminalCombos[0].Times[i].DepartingTime;
            // console.log(arrString);
            const replString = arrString.replaceAll(/[^-0-9]+/g, '');
            const unixString = new Date(parseInt(replString));
            const ferryTime = unixString.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            checkTime(unixString);
            addFerryTime(ferryTime);
        }
    });
}

function printDate(text) {
    // there's no insertAfter() function that I could find
    // create tags in HTML and toggle hidden class on and off
    // instead of creating element every time
    const dateRender = document.getElementById('date-render');
    dateRender.innerHTML = text;
}

function addFerryTime(time) {
    const ferryTimes = document.getElementById('ferry-times');
    const newFerryTime = document.createElement('li');
    // if timePassed true then add class to make it strikethrough
    if (timePassed) {
        // console.log('It is passed this scheduled sailing.');
        newFerryTime.innerHTML = `<i>${time}</i>`;
        timePassed = false;
    } else {
        newFerryTime.innerText = time;
    }
    ferryTimes.appendChild(newFerryTime);
}

function checkTime(schedTime) {
    // console.log(`schedTime.getHours(): ${schedTime.getHours()}`);
    // console.log(`schedTime.getMinutes(): ${schedTime.getMinutes()}`);
    // console.log(`rightNow.getHours(): ${rightNow.getHours()}`);
    // console.log(`rightNowgetMinutes(): ${rightNow.getMinutes()}`);
    if ((rightNow.getHours() > schedTime.getHours()) || (rightNow.getHours() == schedTime.getHours() && rightNow.getMinutes() >= schedTime.getMinutes())) {
        timePassed = true;
    }
}
