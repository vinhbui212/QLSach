import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Register = () => {
  const [formData, setFormData] = useState({

    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/add-user', formData);
      setMessage(res.data);
      navigate("/login")
    } catch (err) {
      alert(err.response.data);
    }
  };

  return (
    // <div>
    //   <h1 className='reg_header'>Register</h1>
    //   {message && <div>{message}</div>}
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label>Username:</label>
    //       <input type="text" name="username" value={formData.username} required onChange={handleChange} />
    //     </div>
    //     <div>
    //       <label>Email:</label>
    //       <input type="email" name="email" value={formData.email} required onChange={handleChange} />
    //     </div>
    //     <div>
    //       <label>Password:</label>
    //       <input type="password" name="password" value={formData.password} required onChange={handleChange} />
    //     </div>
    //     <div>
    //       <label>Confirm Password:</label>
    //       <input type="password" name="confirmPassword" value={formData.confirmPassword} required onChange={handleChange} />
    //     </div>
    //     <button type="submit">Register</button>
    //   </form>
    // </div>
    <div>
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
                    <div class="form-group row mt-2">
                      <label for="email_address" class="col-md-4 col-form-label text-md-right">Username</label>
                      <div class="col-md-6">

                        <input 
                          type="text"
                          placeholder="Username"
                          class="form-control"
                          name="username"
                          required value={formData.username} onChange={handleChange} />
                      </div>
                    </div>

                    <div class="form-group row mt-2">
                      <label for="password" class="col-md-4 col-form-label text-md-right">Email</label>
                      <div class="col-md-6">
                        <input 
                          type="text"
                          placeholder="Email"
                          class="form-control"
                          name="email"
                          required value={formData.email} onChange={handleChange} />
                      </div>
                    </div>

                    <div class="form-group row mt-2">
                      <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                      <div class="col-md-6">
                        <input 
                          type="password"
                          placeholder="Password"
                          class="form-control"
                          name="password"
                          required value={formData.password} onChange={handleChange} />
                      </div>
                    </div>

                    <div class="form-group row mt-2">
                      <label for="password" class="col-md-4 col-form-label text-md-right">Confirm Password</label>
                      <div class="col-md-6">
                        <input 
                          type="password"
                          placeholder="Confirm Password"
                          class="form-control"
                          name="confirmPassword"
                          required value={formData.confirmPassword} onChange={handleChange} />
                      </div>
                    </div>


                    <div class="col-md-6 offset-md-4 mt-2">
                      <button onClick={handleSubmit} type="submit" class="btn btn-primary">
                        Register
                      </button>
                      
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

export default Register;