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

app.use(express.json({ origin: ['http://localhost:3001'] }));

app.use(cors());

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
