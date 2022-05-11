fetch('/api/2022-05-10/4/7')
.then(response => response.json())
.then(data => {
    console.log(data);
});