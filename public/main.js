let date = new Date();
const month = date.toLocaleString('en-US', {month: '2-digit'});
const year = date.getFullYear();
const day = date.toLocaleString('en-US', {day: '2-digit'});
date = year + '-' + month + '-' + day;

// console.log(`The current date is ${date}`);

fetch(`/api/${date}/4/7`)
.then(response => response.json())
.then(data => {
    // console.log(data);
    console.log(data.TerminalCombos[0].Times);
    for (let i = 0; i < data.TerminalCombos[0].Times.length; i++) {
        const arrString = data.TerminalCombos[0].Times[i].DepartingTime;
        // console.log(arrString);
        const replString = arrString.replaceAll(/[^-0-9]+/g, '');
        const ferryTime = new Date(parseInt(replString));
        console.log(`ferry time: ${ferryTime.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})}`);
    }
});