const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { login, createUser } = require('./controllers/users');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { isNotResource } = require('./middlewares/app');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = { _id: '62a4175a3d9d8374d7f89724' };
  next();
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', isNotResource);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
