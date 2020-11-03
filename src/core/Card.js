import React from 'react'
import {Link} from 'react-router-dom'

const Card = ({product, showViewButton=true}) => {
    const viewButton = () => {
        return (
            <Link to={`/products/${product._id}`}>
                <button className="btn btn-success mb-2">View</button>
            </Link>
        );
    }

    const returnDescription = () => {
        if(showViewButton) {
            return (showViewButton && viewButton());
        } else {
            return (<p className="lead">{product.description}</p>)
        } 
    }

    return (
            <div className="card" >
                <div className="card-body text-center">
                    <img className="card-img-top" style={{ maxHeight: "100%", maxWidth: "100%" }} src={`${process.env.REACT_APP_API_URL}/products/${product._id}/photo`} alt={product.name} />
                    <div className="card-text ">
                        <h6>{product.name}</h6>
                        <h6>Rs.{product.price}</h6>
                        {returnDescription()}
                        <button to="/" className="btn btn-success">Add To Cart</button>
                    </div>
                </div>   
            </div>
    );
}

export default Card;