const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www9.sabesp.com.br/agenciavirtual/pages/template/siteexterno.iface?idFuncao=18');
  
  await page.waitForSelector('.w80VenEnd')
  await page.click('.w80VenEnd');
  await page.keyboard.type('00594845866', { delay: 10})
  await page.click('.iceCmdLnk')

  await page.waitForSelector('.iceSelOneMnu')
  
  const option = (await page.$x(
    '//*[@id = "frmhome:j_id301"]/option[text() = "SAO JOSE DOS CAMPOS"]'
  ))[0];
  const value = await (await option.getProperty('value')).jsonValue();
  await page.select('select#frmhome:j_id301', value);
  
})();