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

        const isValidCookTime = /^[0-9]h[0-5]?[0-9]m$/.test(formData.cookTime);

        if (!isValidCookTime && formData.cookTime !== "") {
            setError("Invalid cooking time format. Use XhYYm format (e.g., 2h30).");
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
                tags: ''
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

    // const handleFileChange = (event) => {
    //     const file = event.target.files[0]
    //     console.log(file)

    //     try {
    //         if (file) {
    //             const acceptedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp']
    //             const reader = new FileReader()
    //             if (acceptedTypes.includes(file.type)) {
    //                 reader.onloadend = () => {
    //                     setPreviewImage(reader.result)
    //                 }
    //             }
    //             reader.readAsDataURL(file)
    
    //             handleInputChange(event)
    //             setError('')
    //         }
    //     } catch {
    //         setError('File upload or preview failed')
    //     }
    // }

    // Update form data handler
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
            <>
            <Navbar expand="lg" className="navbar navbar-dark bg-dark">
                <Container>
                    <Navbar.Brand>Recipe Website</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" className='font-weight-bold'>Home</Nav.Link>
                        <Nav.Link as={Link} to="/update-profile">Profile</Nav.Link>
                        <Nav.Link as={Link} to="/add-recipe">Contribute</Nav.Link>
                    </Nav>
                    <Form className="d-flex gap-2">
                        <FormControl
                            // onChange={this.handleSearchInput}
                            ref={searchRef}
                            type="text"
                            placeholder="Search"
                            disabled
                        />
                        <Button variant="outline-info">
                            Search
                        </Button>
                    </Form>
                </Container>
            </Navbar>
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
                                    <Form.Label>Cooking time (XhXXm):</Form.Label>
                                    <Form.Control
                                        name="cookTime"
                                        type="text"
                                        placeholder="Cooking time (e.g.2h30m)"
                                        value={formData.cookTime}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Serving size:</Form.Label>
                                    <Form.Control
                                        name="servingSize"
                                        type="text"
                                        placeholder="Serving size"
                                        value={formData.servingSize}
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
                                        required
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
                                        required
                                    />
                                </Form.Group>
                                {/* <Form.Group>
                                    <Form.Label>Upload a Preview:</Form.Label>
                                    <Form.Control type='file' name='image' onChange={e=>{handleFileChange(e); handleInputChange(e)}}
                                    label="Upload a Photo"
                                    accept=".png,.jpg,.jpeg,.webp"
                                    />
                                    {previewImage && (
                                        <Image src={previewImage} alt="Preview" fluid></Image>
                                    )}
                                </Form.Group> */}
                                <div className="btn-container mt-3">
                                    <Button
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

                <div className="todo-content">
                    {
                        recipes?.map((fieldTitle, i) => (
                            <p key={i}>
                                {fieldTitle.fieldContents}
                            </p>
                        ))
                    }
                </div>
            </>
    )
}

export default AddRecipe;