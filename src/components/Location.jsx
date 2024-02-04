
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [zip, setZip] = useState("");
  const [flyerNames, setFlyerNames] = useState([]);
  const [selectedFlyer, setSelectedFlyer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:8000/getFlyerNames', { zip: zip });
      setFlyerNames(response.data.flyerNames);
    } catch (error) {
      console.error('Error fetching flyer names:', error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if ZIP code is provided
    if (zip.trim() !== "") {
      // Set submitted to true to indicate the initial press of the submit button
      setSubmitted(true);
      // Fetch flyer names for the submitted ZIP code
      await fetchData();
    } else {
      console.log("Please enter a ZIP code.");
    }

    // Now, you can proceed with other actions, e.g., making a POST request
    axios.post("http://localhost:8000", { zip: zip, selectedFlyer: selectedFlyer }).then((res) => {
      console.log(res);
    });
  };

  const handleChange = (event) => {
    setZip(event.target.value);
  };

  const handleFlyerChange = (event) => {
    setSelectedFlyer(event.target.value);
  };

  useEffect(() => {
    // Fetch initial data when the component mounts
    if (submitted) {
      fetchData();
    }
  }, [submitted]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          ZIP:
          <input type="text" value={zip} name="zip" onChange={handleChange} />
        </label>
        <div>
          <h2>Select a Flyer:</h2>
          <select value={selectedFlyer} onChange={handleFlyerChange}>
            <option value="" disabled>Select a flyer</option>
            {flyerNames.map((flyerName, index) => (
              <option key={index} value={flyerName}>{flyerName}</option>
            ))}
          </select>
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;



