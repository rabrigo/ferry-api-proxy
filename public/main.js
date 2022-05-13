let date = new Date();
const month = date.toLocaleString('en-US', {month: '2-digit'});
const year = date.getFullYear();
const day = date.toLocaleString('en-US', {day: '2-digit'});
date = year + '-' + month + '-' + day;
// console.log(`The current date is ${date}`);

fetch(`/api/${date}/4/7`)
.then(response => response.json())
.then(data => {
    const message = `For departing from ${data.TerminalCombos[0].DepartingTerminalName} and arriving in ${data.TerminalCombos[0].ArrivingTerminalName}`;
    printMsg(message);
    // console.log(data);
    // console.log(data.TerminalCombos[0].Times);
    for (let i = 0; i < data.TerminalCombos[0].Times.length; i++) {
        const arrString = data.TerminalCombos[0].Times[i].DepartingTime;
        // console.log(arrString);
        const replString = arrString.replaceAll(/[^-0-9]+/g, '');
        const dateString = new Date(parseInt(replString));
        const ferryTime = dateString.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        console.log(`ferry time: ${ferryTime}`);
        addFerryTime(ferryTime);
    }
});

function addFerryTime(time) {
    const ferryTimes = document.getElementById('ferry-times');
    const newFerryTime = document.createElement('li');
    newFerryTime.innerText = time;
    ferryTimes.appendChild(newFerryTime);
}

function printMsg(text) {
    // there's no insertAfter() function that I could find
    const ferryTimes = document.getElementById('ferry-times');
    const mainMsg = document.createElement('h2');
    mainMsg.innerText = text;
    ferryTimes.parentNode.insertBefore(mainMsg, ferryTimes);
}
