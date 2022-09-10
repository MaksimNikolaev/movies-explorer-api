const { NODE_ENV, DATABASE_URL, JWT_SECRET } = process.env;

const regExpUrl = /^https?:\/\/(w{3}\.)?[a-z\d]+\.[\w\-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/i;

const MONGODB_ADDRESS = NODE_ENV === 'production' ? DATABASE_URL : 'mongodb://localhost:27017/moviesdb';
const TOKEN_SECRET = NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key';

const AUTH_ERROR_MESSAGE = 'Неправильные почта или пароль.';
const DEFAULT_ERROR_MESSAGE = 'Внутренняя ошибка сервера.';
const VALIDATE_EMAIL_ERROR_MESSAGE = 'Такой Email уже существует';
const INCORRECT_DATA_ERROR_MESSAGE = 'Переданы некорректные данные';
const USER_NOTFOUND_ERROR_MESSAGE = 'Пользователь по указанному _id не найден.';
const MOVIE_NOTFOUND_ERROR_MESSAGE = 'Фильм с указанным _id не найден.';
const MOVIE_REMOVE_ERROR_MESSAGE = 'Нельзя удалить фильм, созданным другим пользователем';
const NOTAUTH_ERROR_MESSAGE = 'Необходима авторизация';
const NOTLINK_ERROR_MESSAGE = 'Введите ссылку.';
const MIN_LENGTH_MESSAGE = 'Минимальная длина имени — 2 символа';
const MAX_LENGTH_MESSAGE = 'Максимальная длина имени — 30 символов';
const INCORRECT_EMAIL_MESSAGE = 'Неправильный формат почты.';
const USER_EXIST_ERROR_MESSAGE = 'Пользователь с указанным email уже существует. Попробуйте еще.';

module.exports = {
  regExpUrl,
  MONGODB_ADDRESS,
  TOKEN_SECRET,
  AUTH_ERROR_MESSAGE,
  DEFAULT_ERROR_MESSAGE,
  VALIDATE_EMAIL_ERROR_MESSAGE,
  INCORRECT_DATA_ERROR_MESSAGE,
  USER_NOTFOUND_ERROR_MESSAGE,
  MOVIE_NOTFOUND_ERROR_MESSAGE,
  MOVIE_REMOVE_ERROR_MESSAGE,
  NOTAUTH_ERROR_MESSAGE,
  NOTLINK_ERROR_MESSAGE,
  MIN_LENGTH_MESSAGE,
  MAX_LENGTH_MESSAGE,
  INCORRECT_EMAIL_MESSAGE,
  USER_EXIST_ERROR_MESSAGE,
};
