fetch('/api/2022-05-11/4/7')
.then(response => response.json())
.then(data => {
    console.log(data);
});