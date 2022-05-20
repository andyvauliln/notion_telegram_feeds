import dotenv from 'dotenv';
import { Client, LogLevel } from '@notionhq/client';

dotenv.config();

const { NOTION_API_TOKEN, SITE_URL, NOTION_FEEDS_DATABASE_ID, CI } =
  process.env;

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
            property: 'ReadyToPost',
            checkbox: {
              equals: true,
            },
          },
          {
            property: 'PostedToTelegram',
            checkbox: {
              equals: false,
            },
          },
        ],
      },
    });
  } catch (err) {
    console.error(err);
    return [];
  }

  const feeds = response.results.map((item) => ({
    id: item.id,
    img: item.cover.external.url,
    description: [
      `📝 <b>${item.properties.Name.title[0].plain_text}</b>`,
      ...item.properties.Description.rich_text.map((r, i) => {
        if (i === 0) {
          return `${r.plain_text}`;
        }
        return r.plain_text;
      }),
      `<a href='${SITE_URL}${item.id}'>Read More</>`,
      item.properties.Tags.multi_select
        .map((r) => `#${r.name.toUpperCase()}`)
        .join(' '),
    ].join('\n\n'),
  }));

  return feeds;
}

export async function updateDatabase(id) {
  const notion = new Client({
    auth: NOTION_API_TOKEN,
    logLevel,
  });

  try {
    await notion.pages.update({
      page_id: id,
      properties: {
        PostedToTelegram: {
          checkbox: true,
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
}
