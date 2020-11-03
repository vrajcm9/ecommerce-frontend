import React, { useState } from 'react';

const Slider = ({ handleFilters }) => {
    const min = 0;
    const max = 100000;
    const [price, setPrice] = useState({ lowerRange: min, higherRange: max });
    const {lowerRange, higherRange} = price

    const handleChange = value => event => {
        setPrice({...price, [value]: event.target.value });
        handleFilters([lowerRange, higherRange]);
    }
    
    return (
        <ul>
            <li className="list-unstyled">
                <input type="range" min={min} max={higherRange} value={lowerRange} onChange={handleChange('lowerRange')} />
                <span>Min: {lowerRange}</span>
            </li>
            <li className="list-unstyled">
                <input type="range" min={lowerRange} max={max} value={higherRange} onChange={handleChange('higherRange')} />
                <span>Max: {higherRange}</span>
            </li>
        </ul>
       
        
    );
}

export default Slider;