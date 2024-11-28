import React, { useEffect } from 'react';
import { useCart } from "./CartStore";
import { useJwt } from "./UserStore";
import axios from 'axios';

export default function ShoppingCart() {
    // Get functions and state from the cart store
    const {
        getCart,
        getCartTotal,
        addToCart,
        modifyCart,
        deleteCartItem,
        fetchCart,
        isLoading,
    } = useCart();

    const cart = getCart(); // Retrieve cart from the store
    console.log("cart: ", cart);

    const { getJwt } = useJwt();

    // Fetch the cart data when the component mounts
    useEffect(() => {
        fetchCart();
    }, []);

    // API: Handle Checkout
    const handleCheckout = async () => {
        return;
        // const jwt = getJwt();
        // try {
        //     const response = await axios.post(
        //         `${import.meta.env.VITE_API_URL}/api/checkout`,
        //         {},
        //         {
        //             headers: {
        //                 Authorization: `Bearer ${jwt}`,
        //             },
        //         }
        //     );
        //     // Redirect to Stripe Checkout
        //     window.location.href = response.data.url;
        // } catch (error) {
        //     console.error("Error during checkout:", error);
        //     alert("Checkout failed. Please try again.");
        // } finally {

        // }
    };

    return (
        <div className="container mt-4">
            <h1>Shopping Cart</h1>
            {isLoading ? (
                <p>Loading cart...</p>
            ) : cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    <ul className="list-group">
                        {cart.map((item) => (
                            <li
                                key={item.id}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <div>
                                    <h5>{item.productName}</h5>
                                    <img src={item.imageUrl} alt={item.productName} />
                                    <div className="d-flex align-items-center mt-2">
                                        <input
                                            type="button"
                                            className="btn btn-sm btn-secondary me-2"
                                            value="-"
                                            onClick={() => modifyCart(item.product_id, item.quantity - 1)}
                                            disabled={isLoading}
                                        />
                                        <p className="mb-0">Quantity: {item.quantity}</p>
                                        <input
                                            type="button"
                                            className="btn btn-sm btn-secondary ms-2"
                                            value="+"
                                            onClick={() => addToCart(item)}
                                            disabled={isLoading}
                                        />
                                        <button
                                            className="btn btn-sm btn-danger ms-2"
                                            onClick={() => deleteCartItem(item.product_id)}
                                            disabled={isLoading}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                </>
            )}

            <div className="mt-3 text-end">
                <h4>Total: ${getCartTotal().toFixed(2)}</h4>
                <button
                    className="btn btn-primary mt-2"
                    onClick={handleCheckout}
                    disabled={isLoading}
                >
                    {isLoading ? "Processing..." : "Proceed to Checkout"}
                </button>
            </div>
        </div>
    );
}
