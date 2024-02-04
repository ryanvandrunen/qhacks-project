import React, { useState, useRef } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, query, where } from 'firebase/firestore';
import { Button, Form, Card, Alert, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    recipeTitle: '',
    ingredients: '',
    cookTime: '',
    instructions: '',
    tags: '',
    servingSize: '',
  });

  const searchRef = useRef('');
  const [error, setError] = useState('');
  const recipes = collection(db, 'recipes')

  const addRecipe = async (e) => {
    e.preventDefault();

    const isValidServingSize = /^[0-99]$/.test(formData.servingSize);

    if (
      formData.recipeTitle === '' ||
      formData.cookTime === '' ||
      formData.ingredients === '' ||
      formData.servingSize === '' ||
      formData.instructions === ''
    ) {
      setError('One or more required fields are empty, please try again.');
      return;
    }

    if (!isValidServingSize || formData.servingSize === '') {
      setError('Invalid serving size format, enter a number');
      return;
    }

    try { 
        const q = query(recipes, where('ingredients', '!=', null))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(async (doc) => {
            try {
                await deleteDoc(doc.ref)
                console.log('document deleted')
            } catch (error) {
                console.error('error deleting document: ', error)
            }
        })

      const docRef = await addDoc(collection(db, 'recipes'), {
        ...formData,
      });

      setFormData({
        recipeTitle: '',
        ingredients: '',
        cookTime: '',
        instructions: '',
        tags: '',
        servingSize: '',
      });

      setError('');

      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      setError('Could not submit the recipe');
    }
  };

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center p-0">
        <div className="w-100" style={{ maxWidth: '400px', marginTop: '30px' }}>
      <Container className="d-flex align-items-center justify-content-center p-0" style={{borderRadius: '20px',
       paddingBottom: "50px" }}>
        <div className="w-100" style={{ maxWidth: '400px', marginTop: '30px', marginBottom: "30px" }}>
          <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', borderRadius: '15px', overflow: 'hidden' }}>
            <Card.Body className="d-flex flex-column align-items-center" style={{ padding: '20px' }}>
              <h2 className="text-center mb-4" style={{ color: 'black' }}>Add Recipe</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form>
                <Form.Group>
                  <Form.Label>Recipe title:<span style={{ color: 'red' }}> *</span></Form.Label>
                  <Form.Control
                    name="recipeTitle"
                    type="text"
                    placeholder="Recipe title"
                    value={formData.recipeTitle}
                    onChange={(e) => setFormData({ ...formData, recipeTitle: e.target.value })}
                    autoComplete="off"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Ingredients:<span style={{ color: 'red' }}> *</span></Form.Label>
                  <Form.Control
                    name="ingredients"
                    type="text"
                    placeholder="List of ingredients (,)"
                    value={formData.ingredients}
                    onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                    autoComplete="off"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Cooking time (XhXXm):<span style={{ color: 'red' }}> *</span></Form.Label>
                  <Form.Control
                    name="cookTime"
                    type="text"
                    placeholder="(e.g.2h30m)"
                    value={formData.cookTime}
                    onChange={(e) => setFormData({ ...formData, cookTime: e.target.value })}
                    autoComplete="off"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Serving size:<span style={{ color: 'red' }}> *</span></Form.Label>
                  <Form.Control
                    name="servingSize"
                    type="text"
                    placeholder="Serving size"
                    value={formData.servingSize}
                    onChange={(e) => setFormData({ ...formData, servingSize: e.target.value })}
                    autoComplete="off"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Instructions:<span style={{ color: 'red' }}> *</span></Form.Label>
                  <Form.Control
                    name="instructions"
                    type="text"
                    placeholder="Instructions"
                    value={formData.instructions}
                    onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                    autoComplete="off"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Tags:</Form.Label>
                  <Form.Control
                    name="tags"
                    type="text"
                    placeholder="Tags (,)"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    autoComplete="off"
                  />
                  <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>* indicates required field</div>
                </Form.Group>

                <div className="btn-container mt-3">
                  <Button
                    style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}
                    type="submit"
                    className="btn-#fa853c"
                    onClick={addRecipe}
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default AddRecipe;

