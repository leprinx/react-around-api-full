const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  getCards,
  deleteCard,
  postCard,
  addLike,
  removeLike,
} = require('../controllers/cards');

const isUrl = (input) => {
  if (!validator.isURL(input)) {
    throw new Error('Not a valid url');
  }
  return input;
};
const validateBody = Joi.object().keys({
  name: Joi.string().required().min(2).max(30),
  link: Joi.string().required().custom(isUrl),
});

const validateAuthHeaders = Joi.object()
  .keys({
    authorization: Joi.string().required(),
  })
  .unknown(true);

const validateIdParams = Joi.object().keys({
  cardId: Joi.string().alphanum().length(24),
});

router.get(
  '',
  celebrate({
    headers: validateAuthHeaders,
  }),
  getCards,
);
router.post(
  '',
  celebrate({
    headers: validateAuthHeaders,
    body: validateBody,
  }),
  postCard,
);
router.delete(
  '/:cardId',
  celebrate({
    headers: validateAuthHeaders,
    params: validateIdParams,
  }),
  deleteCard,
);
router.put(
  '/:cardId/likes',
  celebrate({
    params: validateIdParams,
    headers: validateAuthHeaders,
  }),
  addLike,
);
router.delete(
  '/:cardId/likes',
  celebrate({
    params: validateIdParams,
    headers: validateAuthHeaders,
  }),
  removeLike,
);

module.exports = router;
