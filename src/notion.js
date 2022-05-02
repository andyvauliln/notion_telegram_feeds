import dotenv from 'dotenv';
import { Client, LogLevel } from '@notionhq/client';

dotenv.config();

const {
  NOTION_API_TOKEN,
  NOTION_READER_DATABASE_ID,
  NOTION_FEEDS_DATABASE_ID,
  CI,
} = process.env;

const logLevel = CI ? LogLevel.INFO : LogLevel.DEBUG;

export default async function getNewFeedItems() {
  const notion = new Client({
    auth: NOTION_API_TOKEN,
    logLevel,
  });

  let response;
  try {
    response = await notion.databases.query({
      database_id: NOTION_FEEDS_DATABASE_ID,
      filter: {
        and: [
          {
            property: 'ShouldBePosted',
            checkbox: {
              equals: true,
            },
          },
          {
            timestamp: 'created_time',
            created_time: {
              on_or_after: '2021-05-10', // new Date(Date.now() - 3600).toISOString(), // ToDo: check normal date
            },
          },
        ],
      },
    });
  } catch (err) {
    console.error(err);
    return [];
  }

  const feeds = response.results.map((item) => item.id);

  return feeds;
}
