require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.BD_LINK_PASS);

const morgan = require('morgan');
app.use(morgan('combined'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const houseRoutes = require('./api/routes/houses');
const userRoutes = require('./api/routes/users');
app.use('/houses', houseRoutes);
app.use('/users', userRoutes);

app.use((req, res, next) => {
    res.status(404).json({ wiadomosc: 'Nie znaleziono ' });
});

module.exports = app;
