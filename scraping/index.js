const puppeteer = require("puppeteer");

function run() {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto("https://www.dotafire.com/dota-2/heroes");
      let urls = await page.evaluate(() => {
        let results = [];
        let items = document.querySelectorAll(
          "a:nth-child(n) img:nth-child(1)"
        );
        items.forEach((item) => {
          results.push({
            url: `www.dotafire.com${item.getAttribute("src")}`,
          });
        });
        return results;
      });
      browser.close();
      return resolve(urls);
    } catch (e) {
      return reject(e);
    }
  });
}
run()
  .then((d) => console.log(JSON.stringify(d)))
  .catch(console.error);
