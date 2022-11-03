import { MDBBadge } from 'mdb-react-ui-kit'
import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { BsCartCheckFill } from "react-icons/bs";
import { Link, useLocation } from 'react-router-dom';

import logo from "../../assets/doodle.jpg"

const NavbarFile = ({ totalItems }) => {
  const pageStyles = {
    navBarHeading: { padding: "10px" },
    linkStyle: { textDecoration: "none" },
    cartIcon: { color: "black" },
    badgeSize: { fontSize: "10px" },
  };

  const location = useLocation();
  return (
    <Navbar bg="light" expand="lg" style={pageStyles.navBarHeading}>
      <Container fluid>
        <Link to="/" style={pageStyles.linkStyle}>
          <Navbar.Brand href="#">
            <img src={logo} alt="cratart" height="25px" />
            Craftarts</Navbar.Brand>
        </Link>
        {location.pathname === "/" && (<Link to="/cart">
          <a href="#!" >
            <BsCartCheckFill size={30} style={pageStyles.cartIcon} />
            <MDBBadge color="danger" notification pill style={pageStyles.badgeSize}>
              {totalItems}
            </MDBBadge>
          </a>
        </Link>)}
      </Container>
    </Navbar>
  )
}

export default NavbarFile