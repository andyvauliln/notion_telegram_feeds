import addFeedItemToTelegram from './telegram';
import getNewFeedItems from './notion';
import notionToTelegram from './parser';

async function index() {
  const feedItems = await getNewFeedItems();

  for (let i = 0; i < feedItems.length; i++) {
    const item = feedItems[i];
    await addFeedItemToTelegram(item);
  }
}

index();
