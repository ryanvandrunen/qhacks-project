
import { db } from '../firebase';
import React, { useState } from 'react';
import { FormControl, Button } from 'react-bootstrap';
// import { fetchDataFromWebpage } from './postal';

export default function GetPostalCode() {
  const [postalCode, setPostalCode] = useState('');

  // const handlePostalCodeSubmit = async () => {
  //   const data = fetchDataFromWebpage(postalCode, 'Walmart')
  // }


  return (
    <div>
      <FormControl
        type="text"
        placeholder="Enter postal code"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
      />
      <div className="btn-container mt-3">
        <Button
          type="button"
          className="btn-warning"
          // onClick={handlePostalCodeSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}