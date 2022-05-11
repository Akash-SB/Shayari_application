import React from 'react'
import { Container, Navbar, Form, FormControl, Button, Nav } from 'react-bootstrap'
import logo from "../../assets/img/quotes.png"
import { Link } from 'react-router-dom';
import { MdCategory, MdReceiptLong, MdMenuBook } from "react-icons/md";
import { RiImageEditFill } from "react-icons/ri";

function NavigationBar() {
  return (
    <>
      <Navbar bg="light" className='border-bottom border-primary'>
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt="Logo"
              src={logo}
              width="30"
              className="d-inline-block align-top"
            /> Shayari Application
          </Navbar.Brand>          
          <Form className="d-inline-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-primary">Search</Button>
            </Form>
        </Container>
      </Navbar>
      <Navbar bg="light" className='border-bottom border-primary mb-4' sticky="top">
        <Container>
          <Nav className="me-auto">            
            <Nav.Link>
              <MdCategory />
              <Link to="/category">Category</Link>
            </Nav.Link>
            <Nav.Link>
              <MdReceiptLong />
              <Link to="/shayari">Shayari</Link>
            </Nav.Link>
            <Nav.Link>
              <MdMenuBook />
              <Link to="/writer">Writers</Link>              
            </Nav.Link>
            <Nav.Link>
              <RiImageEditFill />
              <Link to="/editor">Editor</Link>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default NavigationBar