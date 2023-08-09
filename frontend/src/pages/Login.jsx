import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      dispatch(reset());
    }

    if (isSuccess || user) {
      user.userRole === "admin" ? navigate("/adminDash") : navigate("/dash");
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(reset()); // Reset the state before attempting to log in.

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return (
      <div className="spinnerContainer">
        <LoadingSpinner />
      </div>
    );
  }

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
