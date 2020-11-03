import React, { useState } from 'react';

const Search = ({ handleFilters }) => {
    const [search, setSearch] = useState('');

    const handleChange = event => {
        setSearch(event.target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();
        handleFilters(search);
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="search" value={search} onChange={handleChange} />
                <button type="submit">Search</button>
            </form>
        </div>
       
        
    );
}

export default Search;