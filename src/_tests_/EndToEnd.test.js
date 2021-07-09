import puppeteer from 'puppeteer';

describe('Filter events by city', () => {
  let browser;
  let page;

  beforeAll(async () => {
    jest.setTimeout(30000);
    // browser = await puppeteer.launch();
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250, // slow down by 250ms
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.CitySearch');
  });

  afterAll(() => {
    browser.close();
  });

  test('When user hasn’t searched for a city, show upcoming events from all cities.', async () => {
    let eventList = await page.waitForSelector('.EventList');

    expect(eventList).not.toBeNull();
  });

  test('User should see a list of suggestions when they search for a city', async () => {
    await page.type('.city', 'Berlin', { delay: 100 }); // Types slower, like a user
    const List = await page.$('.suggestions');

    // expect(List).toHaveLength(2);
  });

  test('User can select a city from the suggested list', async () => {
    await page.click('.suggestions .list-item');
  });
});

describe('show/hide an event details', () => {
  let browser;
  let page;

  beforeAll(async () => {
    jest.setTimeout(30000);
    // browser = await puppeteer.launch();
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250, // slow down by 250ms
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.Event');
  });

  afterAll(() => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    const eventMoreDetails = await page.$('.show');

    expect(eventMoreDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.Event .detailsButton');
    await page.waitForSelector('.show');
    const eventMoreDetails = await page.$('.show');

    expect(eventMoreDetails).not.toBeNull();
  });

  test('User can collapse an event to hide its details', async () => {
    await page.click('.Event .detailsButton');
    await page.waitForSelector('.collapse');
    const eventMoreDetails = await page.$('.show');

    expect(eventMoreDetails).toBeNull();
  });
});
