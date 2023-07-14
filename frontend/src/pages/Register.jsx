import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, username, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="wrapper">
        <Container className="registerBox">
          <Row className="registerRow">
            <Col md={6} className="sideImage">
              <div className="imageText">
                <p>Grow With Us.</p>
              </div>
            </Col>
            <Col md={6} className="registerContents">
              <div className="inputBox">
                <header className="registerHeader">Register</header>
                <Form onSubmit={onSubmit}>
                  <Form.Group controlId="name" className="registerField">
                    <Form.Label className="labelText">Name</Form.Label>
                    <Form.Control
                      className="registerInput"
                      type="text"
                      name="name"
                      value={name}
                      placeholder="Enter name"
                      onChange={onChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="username" className="registerField">
                    <Form.Label className="labelText">Username</Form.Label>
                    <Form.Control
                      className="registerInput"
                      type="text"
                      name="username"
                      value={username}
                      placeholder="Enter username"
                      onChange={onChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="email" className="registerField">
                    <Form.Label className="labelText">Email</Form.Label>
                    <Form.Control
                      className="registerInput"
                      type="email"
                      name="email"
                      value={email}
                      placeholder="Enter email"
                      onChange={onChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="password" className="registerField">
                    <Form.Label className="labelText">Password</Form.Label>
                    <Form.Control
                      className="registerInput"
                      type="password"
                      name="password"
                      value={password}
                      placeholder="Enter password"
                      required
                      onChange={onChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="password2" className="registerField">
                    <Form.Label className="labelText">
                      Re-enter Your Password
                    </Form.Label>
                    <Form.Control
                      className="registerInput"
                      type="password"
                      name="password2"
                      value={password2}
                      placeholder="Must match entry above"
                      required
                      onChange={onChange}
                    />
                  </Form.Group>
                  <div className="centreButton">
                    <Button type="submit" className="customButton">
                      Sign Up
                    </Button>
                  </div>
                  <div className="signIn">
                    <span>
                      Already have an account? <Link to="/login">Sign In</Link>
                    </span>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Register;
