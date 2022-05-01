const Cards = require('../models/cardSchema');
const {
  BAD_REQUEST,
  NOT_FOUND,
  SUCCES,
} = require('../utils/errorHandlers');
const ErrorHandler = require('../utils/errorClass');

const getCards = (req, res, next) => {
  Cards.find({})
    .then((cards) => res.status(SUCCES).send(cards))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Cards.findById(req.params.cardId)
    .orFail(() => {
      throw new ErrorHandler('No card found for the specified id', NOT_FOUND);
    })
    .then((card) => {
      if (card.owner !== req.user._id) {
        throw new ErrorHandler(`id is ${req.user._id} and card owner: ${card.owner}`, 403);
      } Cards.deleteOne(card._id).then(() => res.status(SUCCES).send({ data: card }));
    })
    .catch(next);
};

const postCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Cards.create({ name, link, owner })
    .then((card) => res.status(SUCCES).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ErrorHandler('Wrong format, please correct it', BAD_REQUEST));
      }
      if (err.name === 'Reqested resource not found') {
        return next(new ErrorHandler('Unable to acces cards', NOT_FOUND));
      } return next(err);
    });
};

const addLike = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new ErrorHandler('No card found for the specified id', NOT_FOUND);
    })
    .then((user) => res.status(SUCCES).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ErrorHandler('Resource not found, enter valid id', BAD_REQUEST));
      }
      if (err.statusCode === NOT_FOUND) {
        return next(new ErrorHandler('Card was not found', NOT_FOUND));
      } return next(err);
    });
};

const removeLike = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new ErrorHandler('No card found for the specified id', NOT_FOUND);
    })
    .then((user) => res.status(SUCCES).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ErrorHandler('Resource not found, enter valid id', BAD_REQUEST));
      }
      if (err.statusCode === NOT_FOUND) {
        return next(new ErrorHandler('Card was not found', NOT_FOUND));
      } return next(err);
    });
};

module.exports = {
  getCards,
  deleteCard,
  postCard,
  addLike,
  removeLike,
};
