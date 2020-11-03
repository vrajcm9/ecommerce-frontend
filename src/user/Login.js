import React, { useState } from 'react';
import Layout from '../core/Layout';
import { connectWithBody, authenticate, isAuthenticated } from '../auth';
import { Redirect } from 'react-router-dom';
import { showError, showSuccess } from '../helpers/ResponseMessages';

const Login = () => {
  const [values, setValues] = useState({
    email: 'admin@gmail.com',
    password: '123456',
    error: '',
    success: false,
  });

  const { email, password, error, success } = values;

  const handleChange = (value) => (event) => {
    setValues({ ...values, error: false, [value]: event.target.value });
  };

  const submitClick = (event) => {
    event.preventDefault();

    connectWithBody({ email, password }, '/auth/login', 'POST').then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        authenticate(data, () => {
          setValues({ ...values, email: '', password: '', success: true });
        });
      }
    });
  };

  const loginForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          className="form-control"
          onChange={handleChange('email')}
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="password"
          className="form-control"
          onChange={handleChange('password')}
          value={password}
        />
      </div>

      <button onClick={submitClick} type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  const redirectTo = () => {
    if (success) {
      if(isAuthenticated().user.role === "user")
        return <Redirect to="/dashboard" />;
      else if(isAuthenticated().user.role === "admin")
        return <Redirect to="/AdminDashboard" />;
    }

    if(isAuthenticated()) {
      return <Redirect to="/" />
    }
  };

  return (
    <Layout
      title="Login"
      description="Login to eCommerce"
      className="container container-fluid"
    >
      {showSuccess(success)}
      {showError(error)}
      {loginForm()}
      {redirectTo()}
    </Layout>
  );
};

export default Login;
