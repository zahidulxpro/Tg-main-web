const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  username: String,
  points: { type: Number, default: 0 },
  referrals: [{ type: String }], // Store the Telegram IDs of referred friends
  referralCount: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', userSchema);
