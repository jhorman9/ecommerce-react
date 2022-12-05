import { Offcanvas } from 'react-bootstrap';
import React, { useState } from 'react';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Cart from './Cart';


const NavBar = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='div--nav'>
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Container>
                <Navbar.Brand>E-commerce</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#features" as={Link} to='/'>Home</Nav.Link>
                    <Nav.Link href="#pricing" as={Link} to='purchases'>Purchases</Nav.Link>
                    <Nav.Link onClick={handleShow}>
                        <i className="fa-solid fa-cart-shopping" style={{fontSize: 20}}></i>
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link as={Link} to='login'>Login <i className="fa-solid fa-right-to-bracket"></i></Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
                <Cart 
                    show={show}
                    handleClose={handleClose}
                    handleShow={handleShow}
                />
            </Navbar>
        </div>
    );
};

export default NavBar;