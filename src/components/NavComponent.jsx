import React, { useRef } from 'react'
import { Form, Navbar, Nav, Button, Container, FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function NavComponent() {
  const searchRef = useRef('')

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
    </>
  )
}
