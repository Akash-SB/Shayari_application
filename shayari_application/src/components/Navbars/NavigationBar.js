import React from 'react'
import { Container, Navbar, Form, FormControl, Button, Nav, NavDropdown } from 'react-bootstrap'
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
            <NavDropdown title="Shayari" id="nav-dropdown">
              <Nav.Link>
                <MdReceiptLong />
                <Link to="/shayari">All Shayari</Link>
              </Nav.Link>
              <NavDropdown.Divider />
              <Nav.Link>
                <RiImageEditFill />
                <Link to="/editor">Shayari Editor</Link>
              </Nav.Link>
            </NavDropdown>
            <NavDropdown title="Category" id="nav-dropdown">
              <Nav.Link>
                <MdCategory />
                <Link to="/category">All Category</Link>
              </Nav.Link> 
              <NavDropdown.Divider />
              <Nav.Link>
                <RiImageEditFill />
                <Link to="/category-editor">Category Editor</Link>
              </Nav.Link>
            </NavDropdown>
            <NavDropdown title="Image Status" id="nav-dropdown">
               <Nav.Link>
                <MdMenuBook />
                <Link to="/image-status">All Status</Link>              
              </Nav.Link>
              <NavDropdown.Divider />
               <Nav.Link>
                <RiImageEditFill />
                <Link to="/status-editor">Status Editor</Link>              
              </Nav.Link>
            </NavDropdown>    
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default NavigationBar