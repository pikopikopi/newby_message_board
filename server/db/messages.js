const Joi = require('joi');
const db = require('./connection');

const schema = Joi.object().keys({
  username: Joi.string().alphanum().required(),
  subject: Joi.string().required(),
  message: Joi.string().max(500).required(),
  imageURL: Joi.string().uri({
    scheme: [
      /https?/,
    ],
  }),
});

const messages = db.get('messages');

function getAll() {
  return messages.find();
}

function create(message) {
  if (!message.username) message.username = 'Anonymous'; // eslint-disable-line no-param-reassign
  const result = Joi.validate(message, schema);
  if (result.error == null) {
    message.created = new Date(); // eslint-disable-line no-param-reassign
    return messages.insert(message);
  }
  return Promise.reject(result.error);
}

module.exports = {
  create,
  getAll,
};
