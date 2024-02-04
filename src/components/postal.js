const { Builder, By, until, Key } = require('selenium-webdriver');
const driver = new Builder().forBrowser('chrome').build();

export const fetchDataFromWebpage = async (postalCode, store) => {
  try {
    const webpage1 = 'https://backflipp.wishabi.com/flipp/items/search?locale=en-ca&postal_code=';
    const webpage2 = '&q=';
    const storeFormatted = store.replace(' ', '%20');
    const webpage = `${webpage1}${postalCode}${webpage2}${storeFormatted}`;

    // Make a GET request using fetch
    const response = await fetch(webpage);

    // Check if the request was successful (status code 200)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the response as JSON
    const data = await response.json();

    // Handle the JSON data
    console.log(data);

    // Return the data if needed
    return data;
  } catch (error) {
    // Handle errors
    console.error('Error:', error.message);
    throw error; // Re-throw the error if needed
  }
}

