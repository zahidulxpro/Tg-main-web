// Explicitly enable cancellation of promises for node-telegram-bot-api
process.env.NTBA_FIX_319 = 1;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { Telegraf, Markup } = require('telegraf');
const userRoutes = require('./routes/userRoutes');
const User = require('./models/User');

// Load environment variables
dotenv.config();

// Confirm that environment variables are loaded correctly
console.log('Bot Token:', process.env.BOT_TOKEN ? 'Loaded' : 'Not loaded');
console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Loaded' : 'Not loaded');

// Express app and port setup
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB with updated URL
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Initialize Telegraf bot
const bot = new Telegraf(process.env.BOT_TOKEN);

// Log when the bot is launched
bot.launch().then(() => console.log("Bot launched successfully")).catch((error) => console.error("Bot launch error:", error));

// Handle `/start` command to provide a link to the web app
bot.start(async (ctx) => {
  const chatId = ctx.chat.id;
  const username = ctx.from.username || 'unknown';

  console.log(`Received /start command from user: ${username}, chatId: ${chatId}`);

  try {
    // Create or find the user in the database
    let user = await User.findOne({ telegramId: chatId });
    if (!user) {
      console.log(`Creating new user with telegramId=${chatId}, username=${username}`);
      user = new User({ telegramId: chatId, username });
      await user.save();
      console.log(`User created: ${chatId}`);
    } else {
      console.log(`User already exists: ${chatId}`);
    }

    // Send the welcome message along with the inline button for the WebApp
    const webAppUrl = 'https://localhost:3000/'; // Replace with your actual WebApp URL
    const welcomeMessage = `Welcome ${username}! Click the button below to open the WebApp and start earning points.`;

    await ctx.reply(
      welcomeMessage,
      Markup.inlineKeyboard([
        Markup.button.webApp('Open WebApp', webAppUrl)
      ])
    );
    console.log(`Welcome message and WebApp link sent to user: ${username}, chatId: ${chatId}`);
  } catch (error) {
    console.error('Error handling /start command:', error);
  }
});

// Middleware for Express
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/users', userRoutes);

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
