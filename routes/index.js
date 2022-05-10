const express = require('express');
// const router = require('express').Router();
const app = express();

app.get('/', (req, res) => {
    res.json('Hi');
});

module.exports = app;