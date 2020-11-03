import React, { useState } from 'react';

const Checkbox = ({ categories, handleFilters }) => {
    const [checked, setChecked] = useState([]);

    const handleChange = categoryId => () => {
        const currentIndex = checked.indexOf(categoryId);
        let currentChecked = [...checked];

        currentIndex === -1 ? currentChecked.push(categoryId) : currentChecked.splice(currentIndex, 1); 
        // console.log(currentChecked);
        setChecked(currentChecked);
        handleFilters(currentChecked);
    }

    return categories.map((category, key) => (
        <li key={key} className="list-unstyled">
            <input type="checkbox" onChange={handleChange(category._id)} className="form-check-input" />
            <label className="form-check-label">{category.name}</label>
        </li> 
    ));
};

export default Checkbox;