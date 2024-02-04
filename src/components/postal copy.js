
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [zip, setZip] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    axios.post("http://localhost:8000", { zip: zip }).then((res) => {
      console.log(res);
    });
  }

  const handleChange = (event) => {
    setZip(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          ZIP:
          <input type="text" value={zip} name="zip" onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
export default App
