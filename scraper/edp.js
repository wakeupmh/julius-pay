const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

module.exports = async ({ 
  url,
  installationNumber,
}) => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto(url)
  await page.waitForXPath('//*[@id="option-2"]')

  await page.click('#option-2')
  await page.click('#Instalacao')
  await page.keyboard.type(installationNumber, { delay: 800 })
  await page.click('#btn-avancar')
  await page.waitForNavigation()
  await page.click('.btn-segunda-via')

  await page.waitForXPath('//*[@id="option-5"]')
  await page.click('#option-5')
  await page.waitForXPath('//*[@id="option-6"]')
  await page.click('#option-6')
  await page.click('.edp-btn-dark')
  
}