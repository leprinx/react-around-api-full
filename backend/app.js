const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const error = require('./middlewares/error');

const app = express();
const { PORT = 3000 } = process.env;

require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/arounddb', {
  useNewUrlParser: true,
});
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(requestLogger);
app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Origin',
    'https://pep.students.nomoreparties.sbs',
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, authorization',
  );
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  next();
});
app.use(cors());
app.options('*', cors());
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use('', error);

app.listen(PORT, () => {
  console.log('App running on port 3000...');
});
