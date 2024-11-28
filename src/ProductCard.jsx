import React from 'react';
import { useCart } from './CartStore';

export default function ProductCard(props) {
    const { addToCart} = useCart();
     const updateCart = async () => {
        setIsUpdating(true); // indicate that the cart is being updated right now
        const jwt = getJwt();
        try {

            const updatedCartItems = cart.map(item => {
                return {
                    product_id: item.product_id,
                    quantity: item.quantity
                }
            })

            // this axios.put has three parameters
            // parameter 1: the endpoint URL
            // parameter 2: the payload (or whatever will be in req.body)
            // parameter 3: the HTTP options (authorization)
            await axios.put(
                import.meta.env.VITE_API_URL + "/api/cart",
                {
                    cartItems: updatedCartItems
                },
                {
                    headers: {
                        'Authorization': `Bearer ${jwt}`
                    }
                }
            )
        } catch (e) {
            console.error("Error updating cart", e);
        } finally {
            setIsUpdating(false);
        }
    }
    return (
        <div className="card">
        <img
          src={props.imageUrl}
          className="card-img-top"
          alt={props.productName}
        />
        <div className="card-body">
          <h5 className="card-title">{props.productName}</h5>
          <p className="card-text">{props.price}</p>
          <button className="btn btn-success" onClick={()=>{
            addToCart(props);
          }}>Add to Cart</button>
        </div>
      </div>
    )
}