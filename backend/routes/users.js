const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getUserData,
} = require('../controllers/users');

const isUrl = (input) => {
  if (!validator.isURL(input)) {
    throw new Error('Not a valid url');
  }
  return input;
};
const validateBodyInfo = Joi.object().keys({
  name: Joi.string().required().min(2).max(30),
  about: Joi.string().required(),
});

const validateBodyAvatar = Joi.object().keys({
  avatar: Joi.string().required().custom(isUrl),
});

const validateAuthHeaders = Joi.object()
  .keys({
    authorization: Joi.string().required(),
  })
  .unknown(true);

const validateIdParams = Joi.object().keys({
  id: Joi.string().alphanum().length(24),
});

router.get(
  '',
  celebrate({
    headers: validateAuthHeaders,
  }),
  getUsers,
);
router.get(
  '/me',
  celebrate({
    headers: validateAuthHeaders,
  }),
  getUserData,
);
router.get(
  '/:id',
  celebrate({
    params: validateIdParams,
    headers: validateAuthHeaders,
  }),
  getUserById,
);
router.patch(
  '/me',
  celebrate({
    headers: validateAuthHeaders,
    body: validateBodyInfo,
  }),
  updateProfile,
);
router.patch(
  '/me/avatar',
  celebrate({
    headers: validateAuthHeaders,
    body: validateBodyAvatar,
  }),
  updateAvatar,
);

module.exports = router;
