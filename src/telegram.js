import TelegramBot from 'telegram-bot-nodejs';

const token = '5230540212:AAFhH0UTDBU1XdPuWUxBZ3j7C7_YpACRdkg';

const bot = new TelegramBot(token, '@duniakriptoind');

export default function addFeedItemToTelegram(feed) {
  console.log(`https://duniakripto-ssr.vercel.app/${feed}`, 'data');
  bot.sendMessage(`https://duniakripto-ssr.vercel.app/${feed}`);
}
