import React, { useState } from 'react'
import { Form, Navbar, Nav, Button, Container, FormControl } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function NavComponent() {
    const navigate = useNavigate()
    const { currentUser } = useAuth()

  return (
    <>
      <Navbar expand="lg" className="navbar navbar-dark bg-dark">
                <Container>
                    <Navbar.Brand>Recipe Website</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/add-recipe">Contribute</Nav.Link>
                        <Nav.Link as={Link} to='/stores-near-me'>Stores Near Me</Nav.Link>
                        <Nav.Link as={Link} to="/search-results">Search</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link as={Link} to="/update-profile">Logged in as: {currentUser.email}</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
    </>
  )
}
