import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { updateDatabase } from './notion';

dotenv.config();

const { TELEGRAM_BOT_TOKEN, SITE_URL } = process.env;

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

export default async function addFeedItemToTelegram(feed) {
  try {
    bot.sendPhoto('@duniakriptoind', feed.img, {
      caption: `${feed.description}`,
      parse_mode: 'HTML',
    });
  } catch (err) {
    console.log(err);
  }
  await updateDatabase(feed.id);
}
