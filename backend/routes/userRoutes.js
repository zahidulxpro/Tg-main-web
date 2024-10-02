const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Get or create user based on Telegram ID
router.post('/get-or-create', async (req, res) => {
  const { telegramId, username } = req.body;

  try {
    let user = await User.findOne({ telegramId });

    if (!user) {
      user = new User({ telegramId, username });
      await user.save();
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// Update user points
router.post('/update-points', async (req, res) => {
  const { telegramId, points } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { telegramId },
      { $inc: { points } },
      { new: true }
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// Add referral
router.post('/add-referral', async (req, res) => {
  const { telegramId, referredId } = req.body;

  try {
    const user = await User.findOne({ telegramId });

    if (user) {
      if (!user.referrals.includes(referredId)) {
        user.referrals.push(referredId);
        user.referralCount += 1;
        await user.save();
      }

      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

module.exports = router;
