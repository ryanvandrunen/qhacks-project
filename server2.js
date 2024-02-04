import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Builder, By, Key, until } from 'selenium-webdriver';
import fetch from "node-fetch";
const app = express();
app.use(express.json());
const port = 8000;
app.use(cors());
app.use(bodyParser.json());
let zip;
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms)); s
}
app.post("/", async (req, res) => {
  zip = req.body.zip;
  // Process the zip code as needed (e.g., save to a database, perform some logic)
  console.log("Received ZIP code:", zip);

  // Send a response back to the client
  res.json({ message: "ZIP code received successfully" });
  await WebScrapingLocalTest();
});
// Move the following code inside an async function
async function WebScrapingLocalTest() {
  let driver;
  let wait; // Define the wait variable

  try {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://flipp.com');

    // Find the input field by CSS selector
    const inputField = await driver.findElement(By.css('input[placeholder="postal code"]'));

    // Clear the existing value in the input field
    await inputField.clear();

    // Enter the new postal code
    const newPostalCode = zip;
    await inputField.sendKeys(newPostalCode, Key.RETURN);

    // Define the wait variable with a timeout of 10 seconds
    console.log('made it');

    // Find and click the "Start Saving" link by class name

    const groceriesLinkXPath = '//a[@is="flipp-link" and @href="/en-ca/flyers/groceries?postal_code=' + newPostalCode + '"]';
    const groceriesLink = await driver.wait(until.elementLocated(By.xpath(groceriesLinkXPath)), 5000);
    await driver.wait(until.elementIsVisible(groceriesLink), 15000);
    await groceriesLink.click();

    const flyerItems = await driver.wait(until.elementsLocated(By.className('flyer-container')))
    // Continue with oter actions or logic after clicking the link
    const flyerNames = [];
    for (const flyerItem of flyerItems) {
      try {
        // Wait for the flyer name element to be present
        const flyerNameElement = await flyerItem.findElement(By.className('flyer-name'));

        // Get the flyer name and date
        const flyerName = await flyerNameElement.getText();

        // Print or store the information as needed
        console.log(`Flyer Name: ${flyerName}`);
        flyerNames.push(flyerName);

      } catch (error) {
        console.error(error);
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    if (driver) {
      // Add a delay before quitting to keep the browser window open
      await sleep(5000); // Add a delay of 5 seconds before quitting
      await driver.quit();
    }
    res.json({ flyerNames });
  }
};

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});