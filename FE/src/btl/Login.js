import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./Login.css"
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/check-access", {
        username: username,
        password: password,
      });
      if (response.data === "Admin access granted!") {

        navigate("/admin")
      }
      else {

        navigate("/user")
      }
    }
    catch (error) {
      setMessage("Wrong Password or Username");
    }
  };

  return (
    <div>
      {/* <h1 className="login_header">Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <a href="/register" >Register</a>
        <br />
        <button type="submit">Login</button>


      </form>
      {message && <p>{message}</p>} */}

      <nav class="navbar navbar-expand-lg navbar-light navbar-laravel">
        <div class="container">
          <a class="navbar-brand" href="#">Laravel</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <a class="nav-link" href="/login">Login</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/register">Register</a>
              </li>
            </ul>

          </div>
        </div>
      </nav>

      <div class="login-form">
        <div class="cotainer">
          <div class="row justify-content-center">
            <div class="col-md-8">
              <div class="card">
                <div class="card-header">Login</div>
                <div class="card-body">
                  <div action="" method="">
                    <div class="form-group row">
                      <label for="email_address" class="col-md-4 col-form-label text-md-right">Username</label>
                      <div class="col-md-6">
                        
                        <input
                        id="email_address"
                          type="text"
                          placeholder="Username"
                          class="form-control"
                          value={username}
                          required autofocus
                          onChange={(event) => setUsername(event.target.value)}
                        />
                      </div>
                    </div>

                    <div class="form-group row">
                      <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                      <div class="col-md-6">
                        <input
                        id="password"
                          type="password"
                          placeholder="Password"
                          class="form-control"
                          value={password}
                          name="password"
                          required autofocus
                          onChange={(event) => setPassword(event.target.value)}
                        />
                      </div>
                    </div>

                    <div class="form-group row">
                      <div class="col-md-6 offset-md-4">
                        <div class="checkbox">
                          <label>
                            <input type="checkbox" name="remember" /> Remember Me
                          </label>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6 offset-md-4">
                      <button onClick={handleSubmit} type="submit" class="btn btn-primary">
                        Login
                      </button>
                      <a href="#" class="btn btn-link">
                        Forgot Your Password?
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>



  );
};

export default Login;