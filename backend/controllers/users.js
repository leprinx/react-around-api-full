const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/userSchema');
const { BAD_REQUEST, NOT_FOUND, SUCCES } = require('../utils/errorHandlers');
const ErrorHandler = require('../utils/errorClass');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  Users.find({})
    .orFail(() => {
      throw new ErrorHandler('No card found for the specified id', NOT_FOUND);
    })
    .then((users) => res.status(SUCCES).send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  Users.findById(req.params.id)
    .then((users) => {
      if (!users) {
        throw new ErrorHandler('Provided user Not Found', NOT_FOUND);
      }
      return res.status(SUCCES).send(users);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(
          new ErrorHandler(
            'Unable to acces the users, please check information provided',
            BAD_REQUEST,
          ),
        );
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  Users.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ErrorHandler('User already exists', 403);
      } else {
        return bcrypt.hash(password, 10);
      }
    })
    .then((hash) => {
      Users.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((user) => res.status(SUCCES).send({ data: user }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            return next(
              new ErrorHandler(
                'Wrong information format was entered',
                BAD_REQUEST,
              ),
            );
          }
          if (err.name === 'Reqested resource not found') {
            return next(
              new ErrorHandler(
                'Unable to acces the users, please check url',
                NOT_FOUND,
              ),
            );
          }
          return next(err);
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return Users.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'test-string',
        {
          expiresIn: '7d',
        },
      );
      const logedUser = user;
      delete logedUser.password;
      res.send({ data: logedUser, token });
    })
    .catch(() => next(new ErrorHandler('Wrong email or password', 401)));
};

const updateProfile = (req, res, next) => {
  const { name: updatedName, about: updatedAbout } = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    { $set: { name: updatedName, about: updatedAbout } },
    { new: true, runValidators: true },
  )
    .orFail(
      () => new ErrorHandler('No card found for the specified id', NOT_FOUND),
    )
    .then((user) => res.status(SUCCES).send({ data: user }))
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar: updatedAvatar } = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    { avatar: updatedAvatar },
    { new: true, runValidators: true },
  )
    .orFail(
      () => new ErrorHandler('No card found for the specified id', NOT_FOUND),
    )
    .then((newAvatar) => res.status(SUCCES).send({ data: newAvatar }))
    .catch(next);
};

const getUserData = (req, res, next) => {
  Users.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new ErrorHandler('No user found', NOT_FOUND);
      } else {
        return res.status(200).send({ myUser: user });
      }
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getUserData,
};
