import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

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
        <Container className="loginBox">
          <Row className="loginRow">
            <Col md={6} className="sideImage">
              <div className="imageText">
                <p>Care For Your Community.</p>
              </div>
            </Col>
            <Col md={6} className="loginContents">
              <div className="inputBox">
                <header className="loginHeader">Login</header>
                <Form onSubmit={onSubmit}>
                  <Form.Group controlId="email" className="inputField">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      className="input"
                      type="email"
                      name="email"
                      value={email}
                      placeholder="Enter email"
                      onChange={onChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="password" className="inputField">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      className="input"
                      type="password"
                      name="password"
                      value={password}
                      placeholder="Enter password"
                      required
                      onChange={onChange}
                    />
                  </Form.Group>
                  <div className="centreButton">
                    <Button type="submit" className="customButton">
                      Sign In
                    </Button>
                  </div>
                  <div className="signUp">
                    <span>
                      Don't have an account? <Link to="/register">Sign Up</Link>
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

export default Login;
