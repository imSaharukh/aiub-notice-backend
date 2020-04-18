const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.aiub.edu/category/notices?pageNo=1&pageSize=20');
    //await page.screenshot({ path: 'example.png' });

    const result = await page.evaluate(() => {
        let titleFromAIUB = document.querySelectorAll(".title")
        const titleList = [...titleFromAIUB]
        return titleList.map(h => h.innerText)
    })
    console.log(result);
    await browser.close();
})();