import React from 'react';
import { Link, withRouter} from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

function Header(props: any) {
	return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">Project Singular Point</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
          <NavDropdown title="Projects" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/projects/raw">Overview</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <NavDropdown title="Finances" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/finances/raw">Raw Data</NavDropdown.Item>
            <NavDropdown.Item href="/finances/payments">Payments</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
	);
}

export default withRouter(Header);