import puppeteer  from "puppeteer";

const example = async() => {
    await page.goto('https://example.com'); 
 
// Get the node and extract the text 
const titleNode = await page.$('h1'); 
const title = await page.evaluate(el => el.innerText, titleNode); 
 
// We can do both actions with one command 
// In this case, extract the href attribute instead of the text 
const link = await page.$eval('a', anchor => anchor.getAttribute('href')); 
 
console.log({ title, link });
}