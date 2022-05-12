let date = new Date();
const month = date.toLocaleString('en-US', {month: '2-digit'});
const year = date.getFullYear();
const day = date.toLocaleString('en-US', {day: '2-digit'});
date = year + '-' + month + '-' + day;
// YYYY - MM - DD format

console.log(`The current date is ${date}`);

fetch(`/api/${date}/4/7`)
.then(response => response.json())
.then(data => {
    console.log(data);
});