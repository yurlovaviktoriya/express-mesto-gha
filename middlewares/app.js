const BadRequestError = require('./httpErrorClasses/BadRequestError');
const InternalServerError = require('./httpErrorClasses/InternalServerError');

const sendResponseWithErrorMessage = (res, err) => {
  res.status(err.statusCode).send({
    message: `Ошибка: ${err.statusCode}.${err.name}. ${err.message}`
  });
};

const isDbErrors = (res, err) => {
  if ('errors' in err) {
    const error = new BadRequestError(`Переданы некорректные данные для полей ${Object.keys(err.errors)}. ` +
    `Сервер не может обработать ваш запрос. Сообщение сервера: ${err.message}`);
    sendResponseWithErrorMessage(res, error);
  } else {
    const error = new InternalServerError('На сервере произошла ошибка. Проверьте URL, корректность данных и ' +
      'повторите запрос. Если ошибка не исчезла, попробуйте обратиться позже');
    sendResponseWithErrorMessage(res, error);
  }
};

module.exports = {
  sendResponseWithErrorMessage,
  isDbErrors
};
