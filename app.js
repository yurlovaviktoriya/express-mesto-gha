const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { isNotResource, sendResponseWithErrorMessage } = require('./middlewares/app');
const { signupValidator, signinValidator } = require('./middlewares/validation/users');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');


const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(cookieParser());

app.post('/signin', signinValidator, login);
app.post('/signup', signupValidator, createUser);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', isNotResource);

app.use(errors());
app.use(sendResponseWithErrorMessage);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
