import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import {connect} from '../auth'
import Card from './Card';

const Home = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [sellingProducts, setSellingProducts] = useState([]);
  const [error, setError] = useState(false);
  const [count, setCount] = useState(0);

  const loadLatestProducts = () => {
    connect(`/products`, 'GET').then(data => {
      if(data.error) {
        setError(data.error);
      } else {
        setLatestProducts(data.data);
        setCount(data.results);
      }
    }).catch(err => console.log(err));
  }

  const loadSellingProducts = () => {
    connect(`/products?sort=-sold`, 'GET').then(data => {
      if(data.error) {
        setError(data.error);
      } else {
        setSellingProducts(data.data);
      }
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    loadLatestProducts();
    loadSellingProducts();
  }, []);

  return <Layout title="Home" description="eCommerce" className="container-fluid">
    <div>Count: {count}</div>
    <div className="row">
      
        {latestProducts.map((product, key) => (
          <div key={key} className="col-2 mb-2">
          <Card key={key} product={product} />
          </div>)
      )}
      
    </div>
  </Layout>
};

export default Home;
