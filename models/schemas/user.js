const { Schema } = require('mongoose');
const shortId = require('./types/short-id');

const UserSchema = new Schema({
    shortId,
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = UserSchema;