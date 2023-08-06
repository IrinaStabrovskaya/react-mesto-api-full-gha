require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const { errors } = require('celebrate');

const cors = require('cors');

const errorHandler = require('./middlewares/error-handler');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const routes = require('./routes/index');

const app = express();

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://0.0.0.0:27017/mestodb');

app.use(express.json());

app.use(cors());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
