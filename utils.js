import { nanoid } from "nanoid";
import puppeteer from "puppeteer";

/**
 * takeScreenshot and save it in fs
 *
 * @param {string} rollno
 * @returns {Promise} screenshot path
 */
const takeScreenshot = async (rollno) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`http://niuresults.in/try1jan2021.php?jan2021=${rollno}`);
  const screenshot_path = `screenshots/result_${nanoid()}.png`;
  await page.screenshot({ path: screenshot_path });

  await browser.close();
  return screenshot_path;
};

const parseRoll = (text) => {
  const regex = /(\S)*\/(.*)\/(\d)*/gim; //DE/MC/1802/012
  const roll = text.match(regex);
  if (!roll) return null;
  return roll[0].toUpperCase();
};

export { takeScreenshot, parseRoll };
