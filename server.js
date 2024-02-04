import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Builder, By, Key, until } from 'selenium-webdriver';
import fetch from "node-fetch";
const app = express();
const port = 8000;
app.use(cors());
app.use(bodyParser.json());
let zip;

app.post("/", async (req, res) => {
  zip = req.body.zip;
  // Process the zip code as needed (e.g., save to a database, perform some logic)
  console.log("Received ZIP code:", zip);

  // Send a response back to the client
  res.json({ message: "ZIP code received successfully" });

  // Move the following code inside an async function
  async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    const webpage1 = 'https://backflipp.wishabi.com/flipp/items/search?locale=en-ca&postal_code=';
    let postal_code = zip;
    const webpage2 = "&q=";
    let store = 'Walmart';
    let store_final = store.replace(" ", "%20");
    const webpage = webpage1 + postal_code + webpage2 + store;
    console.log(webpage);

    try {
      await driver.get(webpage);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      // Handle errors
      console.error('Error:', error.message);
    } finally {
      // Ensure to quit the WebDriver in the finally block
      await driver.quit();
    }
  }

  // Call the example function
  await example();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});