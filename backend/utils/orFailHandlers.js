const {
  BAD_REQUEST,
  NOT_FOUND,
} = require('./errorHandlers');
const ErrorHandler = require('./errorClass');

const orFailHandlers = (req, res, err, next) => {
  if (err.statusCode === NOT_FOUND) {
    return next(new ErrorHandler('Unable to acces the users, please misspelled id', NOT_FOUND));
  } if (err.name === 'ValidationError') {
    return next(new ErrorHandler('Wrong information format was enterd', BAD_REQUEST));
  } if (err.name === 'CastError') {
    return next(new ErrorHandler('Unable to acces the users, please check information provided', NOT_FOUND));
  } return next(err);
};

module.exports = orFailHandlers;
