import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase'
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Button, Form, Card, Alert, FormControl, Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'


const AddRecipe = () => {
    const [formData, setFormData] = useState({
        recipeTitle: '',
        ingredients: '',
        cookTime: '',
        instructions: '',
        tags: ''
    });

    const searchRef = useRef('')
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState('');
    const [servingSize, setServingSize] = useState('')

    const addRecipe = async (e) => {
        e.preventDefault();

        // const isValidCookTime = /^[0-9]h[0-5]?[0-9]m$/.test(formData.cookTime);
        const isValidServingSize = /^[0-99]$/.test(formData.servingSize)

        if (formData.recipeTitle=="" || formData.cookTime=="" || formData.ingredients=="" || formData.servingSize=="" || formData.instructions==""){
            setError("One or more required fields are empty, please try again.")
            return;
        }

        // if (!isValidCookTime || formData.cookTime == "") {
        //     setError("Invalid cooking time format. Use XhYYm format (e.g., 2h30).");
        //     return;
        // }
        if (!isValidServingSize || formData.servingSize ==""){
            setError("Invalid serving size format, enter a number");
            return;
        }

        try {
            const docRef = await addDoc(collection(db, "recipes"), {
                ...formData
            });

            setFormData({
                recipeTitle: '',
                ingredients: '',
                cookTime: '',
                instructions: '',
                tags: '',
                servingSize: ''
            });

            setError("")

            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            setError('Could not submit the recipe')
        }
    }

    const fetchPost = async () => {
        await getDocs(collection(db, "recipes"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setRecipes(newData);
                console.log(recipes, newData);
            })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
            <>
                <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "70vh" }}>
                    <div className="w-100" style={{ maxWidth: '400px' }}>
                        <Card style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3'}}>
                            <Card.Body className="d-flex flex-column align-items-center">
                                <h2 className="text-center mb-4">Add Recipe</h2>
                                {error && <Alert variant="danger">{error}</Alert>}
                                <Form.Group>
                                    <Form.Label>Recipe title:<span style={{color: 'red'}}> *</span></Form.Label>
                                    <Form.Control
                                        name="recipeTitle"
                                        type="text"
                                        placeholder="Recipe title"
                                        value={formData.recipeTitle}
                                        onChange={handleInputChange}
                                        autoComplete='off'
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Ingredients:<span style={{color: 'red'}}> *</span></Form.Label>
                                    <Form.Control
                                        name="ingredients"
                                        type="text"
                                        placeholder="List of ingredients (,)"
                                        value={formData.ingredients}
                                        onChange={handleInputChange}
                                        autoComplete='off'
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Cooking time (XhXXm):<span style={{color: 'red'}}> *</span></Form.Label>
                                    <Form.Control
                                        name="cookTime"
                                        type="text"
                                        placeholder="(e.g.2h30m)"
                                        value={formData.cookTime}
                                        onChange={handleInputChange}
                                        autoComplete='off'
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Serving size:<span style={{color: 'red'}}> *</span></Form.Label>
                                    <Form.Control
                                        name="servingSize"
                                        type="text"
                                        placeholder="Serving size"
                                        value={formData.servingSize}
                                        onChange={handleInputChange}
                                        autoComplete='off'
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Instructions:<span style={{color: 'red'}}> *</span></Form.Label>
                                    <Form.Control
                                        name="instructions"
                                        type="text"
                                        placeholder="Instructions"
                                        value={formData.instructions}
                                        onChange={handleInputChange}
                                        autoComplete='off'
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Tags:</Form.Label>
                                    <Form.Control
                                        name="tags"
                                        type="text"
                                        placeholder="Tags"
                                        value={formData.tags}
                                        onChange={handleInputChange}
                                        autoComplete='off'
                                    />
                                    <div style={{color: 'red', fontSize: '12px', marginTop: '5px'}}>* indicates required field</div>
                                </Form.Group>

                                <div className="btn-container mt-3">
                                    <Button
                                        style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'}}
                                        type="submit"
                                        className="btn-warning"
                                        onClick={addRecipe}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </Container>
            </>
    )
}

export default AddRecipe;