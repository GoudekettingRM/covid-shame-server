const express = require('express');
const formData = require('express-form-data');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');
const mainRateLimiter = require('./utils/rateLimitConfig');
const mainSpeedLimiter = require('./utils/slowDownConfig');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(formData.parse());
app.use(mainRateLimiter);
app.use(mainSpeedLimiter);

// if we host on Heroku or something similar, we will have to enable the line below to make sure that express-slow-down works.
// app.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
