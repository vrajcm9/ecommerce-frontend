import React, { useEffect, useState } from 'react';
import Layout from '../core/Layout';
import { connect, connectWithForm, isAuthenticated } from '../auth';
import { showError, showSuccess, showLoading } from '../helpers/ResponseMessages'

const CreateProduct = () => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    categories: [],
    category: '',
    formData: '',
    loading: false,
    error: '',
    success: false,
  });

  const {name, description, price, quantity, category, categories, formData, loading, error, success} = values;

  const {user, token} = isAuthenticated();

  const init = () => {
    connect('/categories', 'GET').then(data => {
        if(data.error) {
            setValues({...values, error: true});
        } else {
            setValues({...values, categories: data.data, formData: new FormData() });
        }
    })
  }

  useEffect(() => {
    init();
  }, []);

  const handleChange = value => event => {
    const formValue = value === 'file' ? event.target.files[0] : event.target.value;
    formData.set(value, formValue);
    setValues({ ...values, error: false, [value]: formValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setValues({...values, loading: true});
    
    connectWithForm(formData, `/categories/${category}/products`, 'POST', token).then(data => {
        if(data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: '',
            description: '',
            price: '',
            quantity: '',
            category: '',
            error: '',
            loading: false,
            success: true,
          });
        }
    });
  };

  const createForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" onChange={handleChange('name')} value={name} required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <input type="text" className="form-control" onChange={handleChange('description')} value={description} placeholder="Optional"/>
            </div>
            <div className="form-group">
              <label className="btn btn-secondary">
                <input type="file" onChange={handleChange('file')} name="file" accept="image/*" />
              </label>
            </div>
            <div className="form-group">
                <label className="text-muted">Price</label>
                <input type="number" className="form-control" onChange={handleChange('price')} value={price} placeholder="Optional"/>
            </div>
            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input type="number" className="form-control" onChange={handleChange('quantity')} value={quantity} placeholder="Optional"/>
            </div>
            <div className="form-group">
                <label className="text-muted">Category</label>
                <select className="form-control" value={category} onChange={handleChange('category')}>
                    <option value="">--Select--</option>
                {categories.map((item, key) => (
                    <option key={key} value={item._id}>{item.name}</option>
                    ))}
                </select>
            </div>
            <button className="btn btn-outline-primary">Create Product</button>
        </form>
  );

  return (
    <Layout title="Create Product" description="Create a new product" className="container container-fluid">
        {showLoading(loading)}
        {showError(error)}
        {showSuccess(success)}
        {createForm()}
    </Layout>
  );
};

export default CreateProduct;
