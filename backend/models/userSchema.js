const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const validateUrl = (email) => {
  const re = /(^(http|https):\/\/(www\.)?[a-z0-9-.]+\.\w{2,3}(\/[a-z0-9-_.~:(/?%#[\]@!$&'()*+,;=]*)*(\/|#)?)/i;
  return re.test(email);
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Explorer',
  },
  avatar: {
    type: String,
    required: true,
    validate: [validateUrl, 'Please fill a valid url'],
    match: [
      /(^(http|https):\/\/(www\.)?[a-z0-9-.]+\.\w{2,3}(\/[a-z0-9-_.~:(/?%#[\]@!$&'()*+,;=]*)*(\/|#)?)/i,
      'Please fill a valid url',
    ],
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Please enter valid email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Incorrect email or password'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
