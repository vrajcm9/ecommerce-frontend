import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {connect, connectWithBody} from '../auth';
import Checkbox from './Checkbox';
import Slider from './Slider';
import Card from './Card';
import Search from './Search';

const Shop = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [error, setError] = useState('');
    const [myFilters, setMyFilters] = useState({
        filters: {
            category: [], price: [], page: 1, limit: 20, search: ''
        }
    });

    const init = () => {
        connect('/categories').then(data => {
            if(data.error) {
                setError(data.error);
            } else {
                setCategories(data.data);
            }
        });
    }

    const handleFilters = (filters, filterBy) => {
        const newFilters = {...myFilters};
        newFilters.filters[filterBy] = filters;
        setMyFilters(newFilters);
    }

    const loadProductsByFilter = (filters) => {
        console.log(filters);
        connectWithBody(filters, '/products/search').then(data => {
            if(data.error) {
                setError(data.error);
            } else {
                setProducts(data.data);
                data.pagination.next != null ? setShowMore(true) : setShowMore(false);
            }
        })
    }

    const loadMore = () => {
        const newFilters = {...myFilters};
        newFilters.filters.limit += 2;
        setMyFilters(newFilters);
    }

    useEffect(() => {
        init();
        loadProductsByFilter(myFilters);
    }, [myFilters]);

    return (
        <Layout title="Shop" description="Search for your products" className="container-fluid">
            <div className="row">
                <div className="col-4">
                    <h4>Filter by categories</h4>
                    <ul>
                        <Checkbox categories={categories} handleFilters={filters => handleFilters(filters, 'category')} />
                    </ul>
                    <h4>Filter by price</h4>
                    <Slider handleFilters={filters => handleFilters(filters, 'price')}/>
                    <h4>Search by name</h4>
                    <Search handleFilters={filters => handleFilters(filters, 'search')} />
                </div>
                <div className="col-8">
                    <div className="row">
                        {products.map((product, key) => (
                        <div key={key} className="col-4 mb-2">
                        <Card key={key} product={product} />
                        </div>)
                        )}
                    </div>
                    {showMore && (<button className="btn btn-warning" onClick={loadMore}>Load More</button>)}
                </div>
            </div>
        </Layout>
    );
}

export default Shop;