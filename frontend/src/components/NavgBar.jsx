import React, { useState } from "react";
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

  // state setters for navgbar expansion
  const [navExpanded, setNavExpanded] = useState(false);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
    closeNav();
  };

  // setting navg to collapsed when clicking between pages
  const closeNav = () => setNavExpanded(false);

  return (
    <>
      <Navbar
        expand="lg"
        className="greenfootNav"
        sticky="top"
        expanded={navExpanded}
        onToggle={(expanded) => setNavExpanded(expanded)}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" onClick={closeNav}>
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
                <NavDropdown.Item as={Link} to="/dbtable" onClick={closeNav}>
                  Table View
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/dbmap" onClick={closeNav}>
                  Map View
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/viewAllTrees"
                  onClick={closeNav}
                >
                  View All Trees
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/viewAllReports"
                  onClick={closeNav}
                >
                  View Reports
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/viewConcernChart"
                  onClick={closeNav}
                >
                  Graph Breakdowns
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/suggestTree" onClick={closeNav}>
                Submit a Report
              </Nav.Link>
              {user ? (
                <>
                  {user.userRole === "admin" ? (
                    <Nav.Link as={Link} to="/adminDash" onClick={closeNav}>
                      Dashboard
                    </Nav.Link>
                  ) : (
                    <Nav.Link as={Link} to="/dash" onClick={closeNav}>
                      Dashboard
                    </Nav.Link>
                  )}
                  <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login" onClick={closeNav}>
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
