const BadRequestError = require('./httpErrorClasses/BadRequestError');
const ResourceNotFoundError = require('./httpErrorClasses/ResourceNotFoundError');

const sendResponseWithErrorMessage = (err, req, res, next) => {
  if (err) {
    const { statusCode = 500, message } = err;
    res.status(statusCode).send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка. Проверьте URL, корректность данных и '
            + 'повторите запрос. Если ошибка не исчезла, попробуйте обратиться позже'
        : message
    });
  }
  next();
};

const isDbErrors = (err) => {
  if ('errors' in err) {
    throw new BadRequestError(`Переданы некорректные данные для полей ${Object.keys(err.errors)}. `
      + `Сервер не может обработать ваш запрос. Сообщение сервера: ${err.message}`);
  }
  return;
};

const isNotResource = () => {
  throw new ResourceNotFoundError('Сервер не может обработать ваш запрос. По заданному запросу нет ресурсов');
};

module.exports = {
  sendResponseWithErrorMessage,
  isDbErrors,
  isNotResource
};
