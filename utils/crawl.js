const puppeteer = require('puppeteer');

class Crawl {
    async scrape(url) {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url);

        const data = await page.$$eval('.hospital-trends .body ul li', e => e.map(el => {


            const title = el.querySelector('a').innerText
            const time = el.querySelector('span').innerText
            const a = el.querySelector('a').href

            return {
                title,
                time,
                a
            }
        }))
        browser.close()

        var arrContent = []
        for (var i = 0; i < data.length; i++) {
            const browser = await puppeteer.launch({ headless: true });

            const page = await browser.newPage();

            await page.goto(data[i].a);

            const Content = await page.$$eval('.about-us', e => e.map(el => {
                const content = el.querySelector('.body').innerHTML

                return {
                    content
                }
            }))
            arrContent.push(Content[0])

            var obj = data.map((item, index) => {
                return { ...item, ...arrContent[index] }
            })
            browser.close()
        }

        return obj
    }
}



module.exports = new Crawl()

