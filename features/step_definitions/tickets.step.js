const { When, Then, Before, After, setDefaultTimeout } = require("cucumber");
const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { clickElement, getText } = require("../../lib/commands.js");

setDefaultTimeout(60000);

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
  await this.page.goto("https://qamid.tmweb.ru/client/index.php");
  await clickElement(this.page, "a:nth-child(3) > span.page-nav__day-week");
  await clickElement(
    this.page,
    ".movie .movie-seances__hall .movie-seances__time"
  );
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

When(
  "user clicks on the next date, and the first available time, on {int} row and {int} chair and click on Забронировать button",
  async function (row, chair) {
    await clickElement(
      this.page,
      `div:nth-child(${row}) > span:nth-child(${chair})`
    );
    return await clickElement(this.page, ".acceptin-button");
  }
);

Then(
  "the user sees a page with the results of booking tickets with Row / Chair {string}",
  async function (string) {
    const actual = await getText(this.page, ".ticket__chairs");
    const expected = string;
    expect(actual).contains(expected);
  }
);

When(
  "user clicks on the next date, and the first available time, on {int} row and {int} chair and on {int} row and {int} chair and click on Забронировать button",
  async function (row1, chair1, row2, chair2) {
    await clickElement(
      this.page,
      `div:nth-child(${row1}) > span:nth-child(${chair1})`,
      this.page,
      `div:nth-child(${row2}) > span:nth-child(${chair2})`
    );
    await clickElement(
      this.page,
      `div:nth-child(${row2}) > span:nth-child(${chair2})`
    );
    return await clickElement(this.page, ".acceptin-button");
  }
);

Then(
  "the user sees a page with the results of booking tickets with Row / Chair: {string}",
  async function (string) {
    const actual = await getText(this.page, ".ticket__chairs");
    const expected = string;
    expect(actual).contains(expected);
  }
);

When(
  "user clicks on the next date, and the first available time, on {string} chair and click on Забронировать button",
  async function (chair) {
    await clickElement(this.page, `div:buying-scheme__chair(${chair})`);
    return await clickElement(this.page, ".acceptin-button");
  }
);
Then("the button Забронировать is desabled", async function (string) {
  const actual = await this.page.$eval(".acceptin-button", (link) =>
    link.getAttribute("disabled")
  );
  expect(actual).equal("true");
});
