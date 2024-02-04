import express from "express";
import bodyParser from "body-parser";
const cors = require('cors');

const app = express();
const port = 8000;
app.use(cors());
app.use(bodyParser.json());

app.post("/", (req, res) => {
  const zip = req.body.zip;
  // Process the zip code as needed (e.g., save to a database, perform some logic)
  console.log("Received ZIP code:", zip);

  // Send a response back to the client
  res.json({ message: "ZIP code received successfully" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});