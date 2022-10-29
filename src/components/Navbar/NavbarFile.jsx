import { MDBBadge, MDBIcon } from 'mdb-react-ui-kit'
import React from 'react'
import { Button, Container, Form, Navbar } from 'react-bootstrap'
import { BsCartCheckFill } from "react-icons/bs";
import { Link, useLocation } from 'react-router-dom';

import logo from "../../assets/doodle.jpg"

const NavbarFile = ({ totalItems }) => {
  const location = useLocation();
  return (
    <Navbar bg="light" expand="lg" style={{ padding: "10px" }}>
      <Container fluid>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Navbar.Brand href="#">
            <img src={logo} alt="cratart" height="25px" />
            Craftarts</Navbar.Brand>
        </Link>
        {location.pathname === "/" && (<Link to="/cart">
          <a href="#!" >
            <BsCartCheckFill size={30} style={{ color: "black" }} />
            <MDBBadge color="danger" notification pill style={{ fontSize: "10px" }}>
              {totalItems}
            </MDBBadge>
          </a>
        </Link>)}
        
      </Container>
    </Navbar>
  )
}

export default NavbarFile