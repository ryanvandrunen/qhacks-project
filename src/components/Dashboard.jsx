import React, { useState, useEffect } from 'react'
import { Card, Button, Alert, Nav, Navbar, Carousel, Container } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        setError('')

        try {
            await logout()
            navigate('/login')
        } catch {
            setError('Failed to log out')
        }
    }

    return (
        <>
            <Navbar expand="lg" className="navbar navbar-dark bg-dark">
                <Container>
                    <Navbar.Brand>Recipe Website</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" className='font-weight-bold'>Home</Nav.Link>
                        <Nav.Link as={Link} to="/update-profile">Profile</Nav.Link>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                Signed in as: {currentUser.email}
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Nav>
                </Container>
            </Navbar>
            
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
