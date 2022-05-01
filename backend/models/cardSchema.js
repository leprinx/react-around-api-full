const mongoose = require('mongoose');

const validateUrl = function (link) {
  const re = /(^(http|https):\/\/(www\.)?[a-z0-9-.]+\.\w{2,3}(\/[a-z0-9-_.~:(/?%#[\]@!$&'()*+,;=]*)*(\/|#)?)/i;
  return re.test(link);
};

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  owner: {
    type: Object,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: [validateUrl, 'Please fill a valid url'],
    match: [
      /(^(http|https):\/\/(www\.)?[a-z0-9-.]+\.\w{2,3}(\/[a-z0-9-_.~:(/?%#[\]@!$&'()*+,;=]*)*(\/|#)?)/i,
      'Please fill a valid url',
    ],
  },
  likes: [
    {
      type: Array,
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
