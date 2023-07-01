import React from "react";
import { FaLeaf } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "../index.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavgBar() {
  return (
    <>
      <Navbar expand="lg" className="greenfootNav" sticky="top">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <FaLeaf /> {"  "} GreenFoot
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown
                title="Our Database"
                id="basic-nav-dropdown"
                className="greenfootNavDropdown"
              >
                <NavDropdown.Item>
                  <Link to="/dbtable">Table View</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/dbmap">Map View</Link>
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link>
                <Link to="/submit">Submit a Report</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/login">Login</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavgBar;
