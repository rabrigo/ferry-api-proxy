let date = new Date();
const month = date.toLocaleString('en-US', {month: '2-digit'});
const year = date.getFullYear();
const day = date.toLocaleString('en-US', {day: '2-digit'});
date = year + '-' + month + '-' + day;
// YYYY - MM - DD format

console.log(`The current date is ${date}`);

// regex for getting the characters between the parenthesis
// from the departuretimes response:  \(([\S]*)\)$

fetch(`/api/${date}/4/7`)
.then(response => response.json())
.then(data => {
    console.log(data);
    console.log(data.TerminalCombos[0].Times);
    const firstDeparture = new Date();
    console.log(data.TerminalCombos[0].Times[0].DepartingTime);
});