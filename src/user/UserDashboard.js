import React from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const {
    user: { name, role, email },
  } = isAuthenticated();

  const userInfo = () => (
    <div className="card">
      <h3 className="card-header">User Information</h3>
      <ul className="list-group">
        <li className="list-group-item">{name}</li>
        <li className="list-group-item">{email}</li>
        <li className="list-group-item">{role}</li>
      </ul>
    </div>
  );

  const purchaseHistory = () => (
    <div className="card">
      <h3 className="card-header">Purchase History</h3>
      <ul className="list-group">
        <li className="list-group-item">Order</li>
      </ul>
    </div>
  );

  const gotoLinks = () => (
    <div className="card">
      <h3 className="card-header">Go To</h3>
      <ul className="list-group">
        <li className="list-group-item">
          <Link to="/cart" className="nav-link">
            My Cart
          </Link>
          <Link to="/update-profile" className="nav-link">
            Update Profile
          </Link>
        </li>
      </ul>
    </div>
  );

  return (
    <Layout
      title="Dashboard"
      description={`Welcome ${name}`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{gotoLinks()}</div>
        <div className="col-9">{userInfo()}</div>
      </div>
      {purchaseHistory()}
    </Layout>
  );
};

export default UserDashboard;
