import React, { useState} from 'react';
import Layout from '../core/Layout';
import { connectWithBody, isAuthenticated } from '../auth';
import { showError, showSuccess } from '../helpers/ResponseMessages'

const CreateCategory = () => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    error: '',
    success: false,
  });

  const {name, description, error, success} = values;

  const {user, token} = isAuthenticated();

  const handleChange = value => event => {
    setValues({ ...values, error: false, [value]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    connectWithBody({name, description}, '/categories', 'POST', token).then(data => {
        if(data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: '',
            description: '',
            error: '',
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
                <input type="text" className="form-control" onChange={handleChange('name')} value={name} placeholder="Optional"/>
            </div>
            <button className="btn btn-outline-primary">Create Category</button>
        </form>
  );

  return (
    <Layout title="Create Category" description="Create a new category" className="container container-fluid">
        {showError(error)}
        {showSuccess(success)}
        {createForm()}
    </Layout>
  );
};

export default CreateCategory;
