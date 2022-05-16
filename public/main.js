let rightNow = new Date();
const month = rightNow.toLocaleString('en-US', { month: '2-digit' });
const year = rightNow.getFullYear();
const day = rightNow.toLocaleString('en-US', { day: '2-digit' });
const dateParam = year + '-' + month + '-' + day;
let departParam;
let arrivalParam;

// console.log(`The current date is ${dateParam}`);
// console.log(`The time is ${rightNow.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`);

// global variable to check if a scheduled time has passed
let timePassed = false;

// add event listener for drop down list
// if certain values are selected then departing and arrival terminals
// are changed in the fetch request
const terminalsList = document.getElementById('terminals-list');
terminalsList.addEventListener('change', function() {
    renderSchedule(this.value);
});

function renderSchedule(terminals) {
    switch(terminals) {
        case '4-7':
            fetchFerries(4, 7);
            break;
        case '7-4':
            fetchFerries(7, 4);
            break;
    }
}

function fetchFerries(departingID, arrivingID) {
    fetch(`/api/${dateParam}/${departingID}/${arrivingID}`)
    .then(response => response.json())
    .then(data => {
        const message = `Departing from ${data.TerminalCombos[0].DepartingTerminalName}, arriving in ${data.TerminalCombos[0].ArrivingTerminalName} <br> for ${rightNow}`;
        printDate(message);
        console.log(data);
        // console.log(data.TerminalCombos[0].Times);
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
    const ferryTimes = document.getElementById('ferry-times');
    const mainMsg = document.createElement('h2');
    mainMsg.innerHTML = text;
    ferryTimes.parentNode.insertBefore(mainMsg, ferryTimes);
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
