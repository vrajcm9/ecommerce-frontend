import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { logout, isAuthenticated } from '../auth';

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return true;
  }

  return false;
};

const Menu = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-pills bg-dark">
        <li className="nav-item">
          <Link
            className={isActive(history, '/') ? 'nav-link active' : 'nav-link'}
            to="/"
          >
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className={isActive(history, '/shop') ? 'nav-link active' : 'nav-link'}
            to="/shop"
          >
            Shop
          </Link>
        </li>

        {!isAuthenticated() && (
          <li className="nav-item">
            <Link
              className={
                isActive(history, '/auth/login')
                  ? 'nav-link active'
                  : 'nav-link'
              }
              to="/auth/login"
            >
              Login
            </Link>
          </li>
        )}

        {!isAuthenticated() && (
          <li className="nav-item">
            <Link
              className={
                isActive(history, '/auth/register')
                  ? 'nav-link active'
                  : 'nav-link'
              }
              to="/auth/register"
            >
              Register
            </Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 'user' && (
        <li className="nav-item">
          <Link
            className={
              isActive(history, '/dashboard') ? 'nav-link active' : 'nav-link'
            }
            to="/dashboard"
          >
            Dashboard
          </Link>
        </li>)}

        {isAuthenticated() && isAuthenticated().user.role === 'seller' && (
        <li className="nav-item">
          <Link
            className={
              isActive(history, '/dashboard') ? 'nav-link active' : 'nav-link'
            }
            to="/dashboard"
          >
            Dashboard
          </Link>
        </li>)}

        {isAuthenticated() && isAuthenticated().user.role === 'admin' && (
        <li className="nav-item">
          <Link
            className={
              isActive(history, '/AdminDashboard') ? 'nav-link active' : 'nav-link'
            }
            to="/AdminDashboard"
          >
            Dashboard
          </Link>
        </li>)}

        {isAuthenticated() && (
          <li className="nav-item">
            <span
              className="nav-link"
              style={{ cursor: 'pointer', color: 'skyblue' }}
              onClick={() => {
                logout(() => {
                  history.push('/');
                });
              }}
            >
              Logout
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
