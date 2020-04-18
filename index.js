const puppeteer = require('puppeteer');
const express = require('express');
var app = express();
const port = 3000
app.get('/', function (req, res) {
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
        res.send(result)
        await browser.close();
    })();

})
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

