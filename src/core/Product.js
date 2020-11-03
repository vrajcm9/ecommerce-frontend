import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import {connect} from '../auth'
import Card from './Card';

const Product = (props) => {
    const [product, setProduct] = useState({});
  const [error, setError] = useState(false);

  const loadProduct = (productId) => {
    connect(`/products/${productId}`, 'GET').then(data => {
      if(data.error) {
        setError(data.error);
      } else {
        setProduct(data.data);
      }
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    const productId = props.match.params.id;
    loadProduct(productId);
  }, []);

  return <Layout title="Product" description="" className="container-fluid">
    <div className="mb-4 row">
      <div className="col-4">
        <Card product={product} showViewButton={false} />
      </div>
    </div>
  </Layout>
};

export default Product;
