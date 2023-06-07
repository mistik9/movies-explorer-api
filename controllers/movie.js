const Movie = require('../models/movie');
const {
  OK, NOT_FOUND_MOVIE_MESSAGE, DEL_MOVIE_MESSAGE, FORBIDDEN_MOVIE_MESSAGE, BAD_DATA_MOVIE_MESSAGE
} = require('../utils/constants');
const {
  BadRequestError, NotFoundError, ForbiddenError,
} = require('../utils/errors/index');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((cards) => res.status(OK).send(cards))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  Movie.findById(_id)
    .orFail(() => {
      throw new NotFoundError(NOT_FOUND_MOVIE_MESSAGE);
    })
    .then((movie) => {
      const { owner: movieOwnerId } = movie;
      if (movieOwnerId.valueOf() === req.user._id) {
        Movie.deleteOne()
          .then(() => {
            res.status(OK).send({ message: DEL_MOVIE_MESSAGE });
          })
          .catch(next);
      } else {
        throw new ForbiddenError(FORBIDDEN_MOVIE_MESSAGE);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(BAD_DATA_MOVIE_MESSAGE));
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
        next(new BadRequestError(BAD_DATA_MOVIE_MESSAGE));
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
