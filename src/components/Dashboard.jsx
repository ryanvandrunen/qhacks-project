import React, { useState, useEffect, useRef } from 'react'
import { Card, Button, Alert, Nav, Navbar, Carousel, Container, Form, FormControl } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { getDocs, collection } from 'firebase/firestore'
import { db } from "../firebase"

export default function Dashboard() {
    const searchRef = useRef()
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()
    const [recipes, setRecipes] = useState()

    const fetchRecipes = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "recipes"));
          const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          return newData;
        } catch (error) {
          console.error('Error fetching recipes:', error);
          return [];
        }
      }

      useEffect(() => {
        const fetchData = async () => {
          const newData = await fetchRecipes();
          setRecipes(newData);
        };
    
        fetchData();
      }, []); 

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
            
            <h1 className="Header">Featured recipes:</h1>

            <Container className="justify-content-center mt-4" style={{ minHeight: "10vh" }}>
            <div className="card mb-4" style={{ width: '90vw', borderRadius: '25px' }}>
                <div className="card-body d-flex align-items-center gap-4">
                        <div>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Expand for modal
                        </button>
                        </div>
                        <div>
                            <h5 className="card-title mb-3">"Recipe Title"</h5>
                            <p className="card-text mb-3">Ingredients:</p>
                            <p className="card-text">Cooking time:</p>
                            <p className="card-text">Serves:</p>    
                            <p className="card-text">Tags:</p>
                        </div>
                </div>
            </div>
            <div className="card mb-4" style={{ width: '90vw', borderRadius: '25px' }}>
                <div className="card-body d-flex align-items-center gap-4">
                        <div>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Expand for modal
                        </button>
                        </div>
                        <div>
                            <h5 className="card-title mb-3">"Recipe Title"</h5>
                            <p className="card-text mb-3">Ingredients:</p>
                            <p className="card-text">Cooking time:</p>
                            <p className="card-text">Serves:</p>    
                            <p className="card-text">Tags:</p>
                        </div>
                </div>
            </div>
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">"Recipe Title"</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                        <div class="modal-body">
                            <p className="card-text mb-3">Ingredients:</p>
                            <p className="card-text">Cooking time:</p>
                            <p className="card-text">Serves:</p>
                            <p className="card-text">Instructions:</p>
                            <p className="card-text">Tags:</p>
                         </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            </Container>



            {/* <Carousel data-bs-theme='dark'>
                <Carousel.Item>
                    <img className="mx-auto d-block w-50" src={example1} alt="First slide" />
                    <Carousel.Caption>
                        <h5>First slide label</h5>
                        <p>Example first slide</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="mx-auto d-block w-50"src={example2} alt="Second slide" />
                    <Carousel.Caption>
                        <h5>Second slide label</h5>
                        <p>Example second slide</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="mx-auto d-block w-50" src={example3} alt="Third slide" />
                    <Carousel.Caption>
                        <h5>Third slide label</h5>
                        <p>Example third slide</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel> */}
        </>
    )
}
