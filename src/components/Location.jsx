import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Button, FormControl } from 'react-bootstrap';

export default function GetPostalCode() {
  const [postalCode, setPostalCode] = useState('');

  const addPostalCode = async () => {
    try {
      const docRef = await addDoc(collection(db, 'postalCodes'), {
        code: postalCode
      });
      console.log('Postal code added with ID: ', docRef.id);

      // Clear the input field after successful submission
      setPostalCode('');
    } catch (error) {
      console.error('Error adding postal code: ', error);
    }
  };

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
          onClick={addPostalCode}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}