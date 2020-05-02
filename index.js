const puppeteer = require("puppeteer");
//express installed

let titles;
let links;
let date;
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.aiub.edu/category/notices?pageNo=1&pageSize=20");
  //await page.screenshot({ path: 'example.png' });

  titles = await page.evaluate(() => {
    let titleFromAIUB = document.querySelectorAll(".title");
    const titleList = [...titleFromAIUB];
    return titleList.map((h) => h.innerText);
  });
  links = await page.evaluate(() => {
    let linkFromAIUB = document.querySelectorAll(".info-link");
    const linkList = [...linkFromAIUB];
    return linkList.map((h) => h.href);
  });
  date = await page.evaluate(() => {
    let dateFromAIUB = document.querySelectorAll(".event-list>li>time");
    const dateList = [...dateFromAIUB];
    return dateList.map((h) => h.innerText.split("\n").join(" "));
  });

  // console.log(titles)
  // console.log(links)
  var keyVal = [];
  for (var i = 0; i < 20; i++) {
    keyVal.push({ date: date[i], title: titles[i], link: links[i] });
  }

  console.log(keyVal);

  await browser.close();
})();
