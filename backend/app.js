require('dotenv').config();

// eslint-disable-next-line import/first
import express, { json } from 'express';
// eslint-disable-next-line import/first
import { connect } from 'mongoose';
// eslint-disable-next-line import/first
import { errors } from 'celebrate';
// eslint-disable-next-line import/first
import cors from 'cors';
// eslint-disable-next-line import/first
import errorHandler from './middlewares/error-handler';
// eslint-disable-next-line import/first
import { requestLogger, errorLogger } from './middlewares/logger';
// eslint-disable-next-line import/first
import routes from './routes/index';

const app = express();

const { PORT = 3000 } = process.env;
connect('mongodb://0.0.0.0:27017/mestodb');

app.use(json());

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
