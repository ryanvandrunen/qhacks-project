// import React, { useState } from 'react'
// import { Form, Navbar, Nav, Button, Container, FormControl } from 'react-bootstrap'
// import { Link, useNavigate } from 'react-router-dom'
// import { useAuth } from '../contexts/AuthContext'

// export default function NavComponent() {
//     const navigate = useNavigate()
//     const { currentUser } = useAuth()

//   return (
//     <>
//       <Navbar expand="lg" className="navbar bg-secondary"
//       style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'}}>
//                 <Container>
//                     <Navbar.Brand>Recipe Website</Navbar.Brand>
//                     <Nav className="me-auto">
//                         <Nav.Link as={Link} to="/">Home</Nav.Link>
//                         <Nav.Link as={Link} to="/add-recipe">Contribute</Nav.Link>
//                         <Nav.Link as={Link} to='/stores-near-me'>Stores Near Me</Nav.Link>
//                         <Nav.Link as={Link} to="/search-results">Search</Nav.Link>
//                     </Nav>
//                     <Nav>
//                         <Nav.Link as={Link} to="/update-profile">Logged in as: {currentUser.email}</Nav.Link>
//                     </Nav>
//                 </Container>
//             </Navbar>
//     </>
//   )
// }


import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function NavComponent() {
  const { currentUser } = useAuth();

  return (
    <Navbar expand="lg" className="navbar" style={{ background: '#fa853c', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
      <Container>
        <Navbar.Brand style={{ display: 'flex', alignItems: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>
          <img src="https://cdn-icons-png.flaticon.com/512/5540/5540650.png" alt="Logo" style={{ height: '30px', marginRight: '10px' }} />
          Recipe Website
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" style={{ color: '#fff', fontSize: '1rem', marginRight: '15px' }}>Home</Nav.Link>
            <Nav.Link as={Link} to="/add-recipe" style={{ color: '#fff', fontSize: '1rem', marginRight: '15px' }}>Contribute</Nav.Link>
            <Nav.Link as={Link} to='/stores-near-me' style={{ color: '#fff', fontSize: '1rem', marginRight: '15px' }}>Stores Near Me</Nav.Link>
            <Nav.Link as={Link} to="/search-results" style={{ color: '#fff', fontSize: '1rem', marginRight: '15px' }}>Search</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/update-profile" style={{ color: '#fff', fontSize: '1rem', border: '1px solid #fff', padding: '5px 10px', borderRadius: '5px' }}>Logged in as: {currentUser.email}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

