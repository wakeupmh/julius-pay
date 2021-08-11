const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const fillRGI = async (page, rgi) => {
  await page.waitForSelector('.w80VenEnd')
  await page.click('.w80VenEnd');
  await page.evaluate(rgi => document.getElementById('frmhome:rgi1').value = rgi, rgi)
}

const proceedWithRGI = async page => {
  await page.waitForXPath('//*[@id="frmhome:j_id175"]')
  await page.evaluate(() => document.getElementById('frmhome:j_id175').click())
}

const sessionLessRoundTrip = async (page, city) => {
  await page.waitForXPath('//*[@id = "frmhome:j_id301"]')
  const option = (await page.$x(
    `//*[@id = "frmhome:j_id301"]/option[text() = "${city}"]`
  ))[0]
  const value = await (await option.getProperty('value')).jsonValue()

  await page.evaluate(value => {
    document.getElementById('frmhome:j_id301').value = value;
  }, value)

  await fillRGI(page)
  await page.evaluate(() => document.getElementById('frmhome:j_id311').click())
  await page.evaluate(() => document.getElementById('frmhome:j_id144:2:j_id153').click())

  await proceedWithRGI(page)
}

module.exports = async ({
  url, rgi, city
}) => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto(url)
  await fillRGI(page, rgi)
  await proceedWithRGI(page)
  
  const isSessionExists = await page.evaluate(() => document.getElementById('frmhome:j_id301'))
  if(!isSessionExists) {
    sessionLessRoundTrip(page, city)
  }
  
  await page.waitForXPath('//*[@id="frmhome:j_id209"]')
  await page.evaluate(() => document.getElementById('frmhome:j_id209').click())
}