import TelegramBot from 'telegram-bot-nodejs';
import dotenv from 'dotenv';

dotenv.config();

const { TELEGRAM_BOT_TOKEN, SITE_URL } = process.env;

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, '@duniakriptoind');

export default function addFeedItemToTelegram(feed) {
  bot.sendMessage(`${SITE_URL}${feed}`);
}
