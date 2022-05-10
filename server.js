const path = require('path');
const express = require('express');
const api = require('./routes/')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}/`))