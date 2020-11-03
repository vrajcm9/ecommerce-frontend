import React, { useState } from 'react';
import Layout from '../core/Layout';
import { connectWithBody } from '../auth';
import { showError, showSuccess } from '../helpers/ResponseMessages';

// Register as a user or seller
const Register = () => {
  const [values, setValues] = useState({
    name: '',
    role: '',
    email: '',
    password: '',
    error: '',
    success: false,
  });

  const { name, role, email, password, error, success } = values;

  const handleChange = (value) => (event) => {
    setValues({ ...values, error: false, [value]: event.target.value });
  };

  const submitClick = (event) => {
    event.preventDefault();

    //Database call for registering
    connectWithBody({ name, role, email, password }, '/auth/register', 'POST').then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: '',
            role: '',
            email: '',
            password: '',
            error: '',
            success: true,
          });
        }
      }
    );
  };

  const registerForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange('name')}
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Role</label>
        <select
          className="form-control"
          onChange={handleChange('role')}
          value={role}
        >
          <option value="">--Select--</option>
          <option value="user">User</option>
          <option value="seller">Seller</option>
        </select>
      </div>

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

  return (
    <Layout
      title="Register"
      description="Register to eCommerce"
      className="container container-fluid"
    >
      {showSuccess(success)}
      {showError(error)}
      {registerForm()}
    </Layout>
  );
};

export default Register;
