// setting variables globally so functions have access
let rightNow = new Date();

// used for fetch request
let dateParam;
let departParam;
let arrivalParam;

// count for scheduled ferry sailings
let timesCount;

// for checkTime() and addFerryTime()
let timePassed = false;

// where ferry times are rendered
const ferryTimes = document.getElementById('ferry-times');

// to view the current date
// console.log(`The current date is ${dateParam}`);
// console.log(`The time is ${rightNow.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`);

// drop down selection
const terminalsList = document.getElementById('routes-list');
terminalsList.addEventListener('change', function() {
    renderSchedule(this.value);
});

// HTML date picker
// const datePicker = document.getElementById('date-picker');
// datePicker.addEventListener('change', function() {
//     dateParam = this.value;
//     console.log(this.value);
// });

$("#date-picker").datepicker({
    onSelect: function() {
        dateParam = $(this).datepicker('getDate');
        dateParam = $.datepicker.formatDate( "yy-mm-dd", dateParam)
        console.log(dateParam);
    }
});

$("#menu").menu();

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
            fetchFerries(12, 8);
            break;
        case '7-3':
            fetchFerries(7, 3);
            break;
        case '7-4':
            fetchFerries(7, 4);
            break;
        case '20-9':
            fetchFerries(20, 9);
            break;
    }
}

function fetchFerries(departingID, arrivingID) {
    timesCount = 0;
    fetch(`/api/${dateParam}/${departingID}/${arrivingID}`)
    .then(response => response.json())
    .then(data => {
        // TODO: format dateParam into day of the week, MM-DD-YYYY
        const message = `${dateParam} \n${data.TerminalCombos[0].DepartingTerminalName} -> ${data.TerminalCombos[0].ArrivingTerminalName}`;
        renderDate(message);
        console.log(data);
        // console.log(data.TerminalCombos[0].Times);
        // reset #ferry-times
        ferryTimes.classList.remove('hidden');
        ferryTimes.innerHTML = '';
        for (let i = 0; i < data.TerminalCombos[0].Times.length; i++) {
            const arrString = data.TerminalCombos[0].Times[i].DepartingTime;
            // console.log(arrString);
            const replString = arrString.replaceAll(/[^-0-9]+/g, '');
            const unixString = new Date(parseInt(replString));
            const sailingTime = unixString.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            checkTime(unixString);
            addFerryTime(sailingTime);
            timesCount++;
        }
        console.log(`timesCount is ${timesCount}`)
        if (timesCount >= 12) {
            ferryTimes.classList.add('col2')
        } else {
            ferryTimes.classList.remove('col2')
        }
    });
}

function renderDate(text) {
    const dateRender = document.getElementById('date-render');
    dateRender.classList.remove('hidden');
    dateRender.innerText = text;
}

function addFerryTime(time) {
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
    if ((schedTime.getHours() > 2) && ((rightNow.getHours() > schedTime.getHours()) || (rightNow.getHours() == schedTime.getHours() && rightNow.getMinutes() >= schedTime.getMinutes()))) {
        timePassed = true;
    }
}
