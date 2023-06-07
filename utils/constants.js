const OK = 200;
const INTERNAL_SERVER = 500;
const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/im;

const NOT_FOUND_USER_MESSAGE = 'Пользователь не найден';
const BAD_DATA_USER_MESSAGE = 'Переданы некорректные данные';
const CONFLICT_USER_MESSAGE = 'Пользователь с таким электронным адресом уже зарегистрирован';
const SIGNIN_MESSAGE = 'Пользователь авторизован';
const CLEAR_COOKIE_MESSAGE = 'Cookies удалены';
const NOT_FOUND_MOVIE_MESSAGE = 'Нет такого фильма';
const DEL_MOVIE_MESSAGE = 'Фильм удален';
const FORBIDDEN_MOVIE_MESSAGE = 'Нельзя удалить фильм не из вашей коллекции';
const BAD_DATA_MOVIE_MESSAGE = 'Переданы некорректные данные';
const NOT_SIGNIN_MESSAGE = 'Необходима авторизация';
const SERVER_MESSAGE = 'На сервере произошла ошибка';
const NOT_FOUND_MESSAGE = 'Cтраница не найдена';

module.exports = {
  urlRegex,
  OK,
  INTERNAL_SERVER,
  NOT_FOUND_USER_MESSAGE,
  BAD_DATA_USER_MESSAGE,
  CONFLICT_USER_MESSAGE,
  SIGNIN_MESSAGE,
  CLEAR_COOKIE_MESSAGE,
  NOT_FOUND_MOVIE_MESSAGE,
  DEL_MOVIE_MESSAGE,
  FORBIDDEN_MOVIE_MESSAGE,
  BAD_DATA_MOVIE_MESSAGE,
  NOT_SIGNIN_MESSAGE,
  SERVER_MESSAGE,
  NOT_FOUND_MESSAGE,
};
