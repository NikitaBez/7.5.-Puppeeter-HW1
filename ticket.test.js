const { clickElement, getText } = require("./lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("cinema ticket booking tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://qamid.tmweb.ru");
    await clickElement(page, "a:nth-child(3) > span.page-nav__day-week");
    await clickElement(page, "a.movie-seances__time");
  });

  test("Should book one ticket", async () => {
    await clickElement(
      page,
      ".buying-scheme__chair_standart:not(.buying-scheme__chair_taken"
    );
    await clickElement(page, "button.acceptin-button");
    const actual = await getText(page, "h2.ticket__check-title");
    await expect(actual).toContain("Вы выбрали билеты:");
  });

  test("Should book two tickets", async () => {
    await clickElement(
      page,
      ".buying-scheme__chair_standart:not(.buying-scheme__chair_taken"
    );
    await clickElement(
      page,
      ".buying-scheme__chair_selected + :not(.buying-scheme__chair_taken"
    );
    await clickElement(page, "button.acceptin-button");
    const actual = await getText(page, "h2.ticket__check-title");
    await expect(actual).toContain("Вы выбрали билеты:");
  });

  test("Should try to book an occupied chair", async () => {
    await clickElement(
      page,
      ".buying-scheme__chair_taken:not(.buying-scheme__chair_standart)"
    );
    const actual = await page.$eval("button.acceptin-button", (link) =>
      link.getAttribute("disabled")
    );
    expect(actual).toEqual("true");
  });
});
