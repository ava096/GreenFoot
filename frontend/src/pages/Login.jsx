import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
        <div className="container-login">
          <div className="row" id="login-row">
            <div className="col-md-6 side-image">
              <div className="login-text">
                <p>Branch Out.</p>
              </div>
            </div>
            <div className="col-md-6 right">
              <div className="input-box">
                <header id="login-header">Login</header>
                <form onSubmit={onSubmit}>
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
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="input-field">
                    <button type="submit" className="btn" id="login-button">
                      Sign In
                    </button>
                  </div>
                </form>
                <div className="signup">
                  <span>
                    Don't have an account? <Link to="/register">Sign Up</Link>
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

export default Login;
