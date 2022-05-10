const express = require('express');
const app = express();
const fetch = require('node-fetch');
const ferryURL = 'https://wsdot.wa.gov/ferries/api/schedule/rest/schedule/2022-05-10/4/7?apiaccesscode=e1200b52-935e-4ab9-9289-7314a369fbc4'

app.get('/', (req, res) => {
    fetch(ferryURL)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        res.send(data);
    });
});

module.exports = app;