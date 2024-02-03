
import React, { useState, useEffect } from 'react';
import { db } from '../firebase'
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Button, Form, Card, Alert } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'

const AddRecipe = () => {
    const [formData, setFormData] = useState({
        recipeTitle: '',
        ingredients: '',
        cookTime: '',
        instructions: '',
        tags: ''
    });
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState('');

    const addRecipe = async (e) => {
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(db, "recipes"), {
                ...formData
            });

            // Reset form data
            setFormData({
                recipeTitle: '',
                ingredients: '',
                cookTime: '',
                instructions: '',
                tags: ''
            });

            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const fetchPost = async () => {
        await getDocs(collection(db, "todos"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setRecipes(newData);
                console.log(recipes, newData);
            })
    }

    useEffect(() => {
        fetchPost();
    }, [])

    // Update form data handler
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <section className="todo-container">
            <div className="todo">
                <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                    <div className="w-100" style={{ maxWidth: '400px' }}>
                        <Card>
                            <Card.Body className="d-flex flex-column align-items-center">
                                <h2 className="text-center mb-4">Add Recipe</h2>
                                {error && <Alert variant="danger">{error}</Alert>}
                                <Form.Group>
                                    <Form.Label>Recipe title:</Form.Label>
                                    <Form.Control
                                        name="recipeTitle"
                                        type="text"
                                        placeholder="Recipe title"
                                        value={formData.recipeTitle}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Ingredients:</Form.Label>
                                    <Form.Control
                                        name="ingredients"
                                        type="text"
                                        placeholder="List of ingredients (,)"
                                        value={formData.ingredients}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Cooking time (XhXX):</Form.Label>
                                    <Form.Control
                                        name="cookTime"
                                        type="text"
                                        placeholder="Cooking time"
                                        value={formData.cookTime}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Instructions:</Form.Label>
                                    <Form.Control
                                        name="instructions"
                                        type="text"
                                        placeholder="Instructions"
                                        value={formData.instructions}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Tags:</Form.Label>
                                    <Form.Control
                                        name="tags"
                                        type="text"
                                        placeholder="tags"
                                        value={formData.tags}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <div className="btn-container mt-3">
                                    <Button
                                        type="submit"
                                        className="btn-primary"
                                        onClick={addRecipe}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </Container>

                <div className="todo-content">
                    {
                        recipes?.map((fieldTitle, i) => (
                            <p key={i}>
                                {fieldTitle.fieldContents}
                            </p>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default AddRecipe;