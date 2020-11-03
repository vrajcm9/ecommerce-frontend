import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './user/Login';
import Register from './user/Register';
import Home from './core/Home';
import Shop from './core/Shop';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import UserDashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import CreateCategory from './admin/CreateCategory';
import CreateProduct from './admin/CreateProduct';
import Product from './core/Product';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/shop" component={Shop} exact />
        <Route path="/auth/login" component={Login} exact />
        <Route path="/auth/register" component={Register} exact />
        <PrivateRoute path="/dashboard" component={UserDashboard} exact />
        <AdminRoute path="/AdminDashboard" component={AdminDashboard} exact />
        <AdminRoute path="/categories/create" component={CreateCategory} exact />
        <AdminRoute path="/products/create" component={CreateProduct} exact />
        <Route path="/products/:id" component={Product} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
