import puppeteer from "puppeteer";

/*
    Another way to search Reddit, via puppeteer, a ts webscraping library
    Note: still finding a way to return corresponding messages under each post link
*/

const course = "COMP6080";
const searchURL = `https://www.reddit.com/r/unsw/search/?q=${course}&restrict_sr=1&type=comment&sort=top`;

async function webscrape() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(searchURL);
    await page.$$("._3yx4Dn0W3Yunucf5sVJeFU");

    const resultsLink = await page.$$eval("._3yx4Dn0W3Yunucf5sVJeFU", links => links.map(link => (link as HTMLAnchorElement).href));
    const resultsMsg = await page.$$eval("._1qeIAgB0cPwnLhDF9XSiJM", msgs => msgs.map(msg => msg.textContent));

    // Logs results in stdout
    resultsLink.forEach((link) => {
        console.log(link);
    });

    console.log("\n")

    resultsMsg.forEach((msg) => {
        if (msg?.includes(course)) {
            console.log(msg);
        }
    })

    await browser.close();
}

webscrape();
