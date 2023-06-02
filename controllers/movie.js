const Movie = require('../models/movie');
const {
  OK,
} = require('../utils/constants');
const {
  BadRequestError, NotFoundError, ForbiddenError,
} = require('../utils/errors/index');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((cards) => res.status(OK).send(cards))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  Movie.findById(_id)
    .orFail(() => {
      throw new NotFoundError('Нет такого фильма');
    })
    .then((movie) => {
      const { owner: movieOwnerId } = movie;
      if (movieOwnerId.valueOf() === req.user._id) {
        Movie.deleteOne()
          .then(() => {
            res.status(OK).send({ message: 'Фильм удален' });
          })
          .catch(next);
      } else {
        throw new ForbiddenError('Нельзя удалить фильм не из вашей коллекции ');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;

  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => {
      res.status(OK).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  deleteMovie,
  createMovie,
};
