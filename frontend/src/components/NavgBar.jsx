import React from "react";
import { FaLeaf } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import "../index.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavgBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <>
      <Navbar expand="lg" className="greenfootNav" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <FaLeaf /> {"  "} GreenFoot
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown
                title="Our Database"
                id="basic-nav-dropdown"
                className="greenfootNavDropdown"
              >
                <NavDropdown.Item as={Link} to="/dbtable">
                  Table View
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/dbmap">
                  Map View
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/submitLocation">
                Submit a Report
              </Nav.Link>
              {user ? (
                <>
                  <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavgBar;
