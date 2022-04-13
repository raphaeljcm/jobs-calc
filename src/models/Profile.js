const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  avatar: { type: String, required: true },
  'monthly-budget': { type: Number, required: true },
  'hours-per-day': { type: Number, required: true },
  'vacation-per-year': { type: Number, required: true },
  'days-per-week': { type: Number, required: true },
  'value-hour': { type: Number, required: true }
});

module.exports = mongoose.model('Profile', profileSchema);