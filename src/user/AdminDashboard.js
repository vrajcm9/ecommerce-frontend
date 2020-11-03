import React from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const {
    user: { name, role, email },
  } = isAuthenticated();

  const adminInfo = () => (
    <div className="card">
      <h3 className="card-header">Admin Information</h3>
      <ul className="list-group">
        <li className="list-group-item">{name}</li>
        <li className="list-group-item">{email}</li>
        <li className="list-group-item">{role}</li>
      </ul>
    </div>
  );

  const gotoLinks = () => (
    <div className="card">
      <h3 className="card-header">Go To</h3>
      <ul className="list-group">
        <li className="list-group-item">
          <Link to="/categories/create" className="nav-link">
            Create Category
          </Link>
          <Link to="/products/create" className="nav-link">
            Create Product
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
        <div className="col-9">{adminInfo()}</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
