const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const {
  Given,
  When,
  Then,
  Before,
  After,
  setDefaultTimeout,
} = require("cucumber");
const { putText, getText } = require("../../lib/commands.js");

setDefaultTimeout(30000);

Before(async function () {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
  await page.goto("https://qamid.tmweb.ru");
  await clickElement(page, "a:nth-child(3) > span.page-nav__day-week");
  await clickElement(page, "a.movie-seances__time");
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", { timeout: 30000 }, async function (string) {
  return await this.page.goto(`https://qamid.tmweb.ru`);
});

When(
  "user sthe user clicks on the next date, and the first available time, selects the first available place, click on Забронировать button",
  async function (string) {
    await clickElement(
      this.page,
      ".buying-scheme__chair_standart:not(.buying-scheme__chair_taken"
    );
    return await clickElement(this.page, "button.acceptin-button");
  }
);

Then(
  "the user sees a page with the results of booking tickets",
  async function (string) {
    const actual = await getText(this.page, "h2.ticket__check-title");
    const expected = await string;
    expect(actual).contains(expected);
  }
);
