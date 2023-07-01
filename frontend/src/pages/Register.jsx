import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
        <div className="container-login">
          <div className="row" id="login-row">
            <div className="col-md-6 side-image">
              <div className="login-text">
                <p>Branch Out.</p>
              </div>
            </div>
            <div className="col-md-6 right">
              <div className="input-box">
                <header id="login-header">Create an account.</header>
                <form onSubmit={onSubmit}>
                  <div className="input-field">
                    <input
                      type="text"
                      className="input"
                      id="name"
                      name="name"
                      value={name}
                      onChange={onChange}
                    />
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="input-field">
                    <input
                      type="text"
                      className="input"
                      id="username"
                      name="username"
                      value={username}
                      onChange={onChange}
                    />
                    <label htmlFor="username">Choose a username</label>
                  </div>
                  <div className="input-field">
                    <input
                      type="text"
                      className="input"
                      id="email"
                      name="email"
                      value={email}
                      required
                      autocomplete="off"
                      onChange={onChange}
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="input-field">
                    <input
                      type="password"
                      className="input"
                      id="password"
                      name="password"
                      required
                      value={password}
                      onChange={onChange}
                    />
                    <label htmlFor="password">Choose a password</label>
                  </div>
                  <div className="input-field">
                    <input
                      type="password"
                      className="input"
                      id="password2"
                      name="password2"
                      required
                      value={password2}
                      onChange={onChange}
                    />
                    <label htmlFor="password2">Re-enter password</label>
                  </div>
                  <div className="input-field">
                    <button type="submit" className="btn" id="login-button">
                      Sign Up
                    </button>
                  </div>
                </form>
                <div className="signup">
                  <span>
                    Already have an account? <Link to="/login">Login</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
