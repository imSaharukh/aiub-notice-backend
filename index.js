const puppeteer = require('puppeteer');
//express installed

let titles;
let links
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.aiub.edu/category/notices?pageNo=1&pageSize=20');
    //await page.screenshot({ path: 'example.png' });

    titles = await page.evaluate(() => {
        let titleFromAIUB = document.querySelectorAll(".title")
        const titleList = [...titleFromAIUB]
        return titleList.map(h => h.innerText)
    })
    links = await page.evaluate(() => {
        let linkFromAIUB = document.querySelectorAll(".info-link")
        const linkList = [...linkFromAIUB]
        return linkList.map(h => h.href)
    })

    console.log(titles)
    console.log(links)
    await browser.close();
})();



