import { atom, useAtom } from 'jotai';
import axios from 'axios';
import Immutable from "seamless-immutable";
import { useEffect, useRef } from "react";
import { useJwt } from "./UserStore";

const initialCart = Immutable([]);

export const cartAtom = atom(initialCart);
export const cartLoadingAtom = atom(false);

export const useCart = () => {
    const [cart, setCart] = useAtom(cartAtom);
    const [isLoading, setIsLoading] = useAtom(cartLoadingAtom);
    const { getJwt } = useJwt();

    // Track whether the initial load is complete
    const isInitialLoad = useRef(true);
    const debounceTimeoutRef = useRef(null);

    const updateCart = async () => {
        console.log("updateCart start: ", isLoading);
        setIsLoading(true);
        const jwt = getJwt();
        console.log("updateCart axios.put");
        try {
            console.log("cart: ", cart.length);
            const updatedCartItems = cart.map((item) => ({
                product_id: item.product_id,
                quantity: item.quantity,
            }));
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/cart`,
                { cartItems: updatedCartItems },
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
        } catch (error) {
            console.error("Error updating cart:", error);
        } finally {
            setIsLoading(false);
        }
        console.log("updateCart end");
    };

    // Debounced cart update, skipping the first load
    useEffect(() => {
        console.log("cart: updated", cart);
        if (isInitialLoad.current) {
            isInitialLoad.current = false;
            return; // Skip the first update
        }

        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(() => {
            updateCart();
        }, 500); // Adjust debounce delay as needed

        return () => clearTimeout(debounceTimeoutRef.current); // Cleanup timeout on unmount or cart changes
    }, [cart]); // Depend on the cart state

    const modifyCart = (product_id, quantity) => {
        setCart((currentCart) => {
            const existingItemIndex = currentCart.findIndex(
                (item) => item.product_id === product_id
            );
            if (existingItemIndex !== -1) {
                if (quantity >= 1) {
                    console.log("modifyCart End");
                    return currentCart.setIn(
                        [existingItemIndex, "quantity"],
                        quantity
                    );
                } else {
                    console.log("modifyCart End");
                    return currentCart.filter(
                        (item) => item.product_id !== product_id
                    );
                }
            }
            console.log("modifyCart End");
            return currentCart;
        });
    };

    const addToCart = (product) => {
        console.log("addToCart Start");
        console.log(product);
        setCart((currentCart) => {
            console.log("currentCart: ", currentCart);
            console.log("product: ", product);

            const existingItemIndex = currentCart.findIndex(
                (item) => {
                    console.log("item: ", item, " | product: ",
                         product, " | result: ",
                         item.product_id === product.product_id);
                     return item.product_id === product.product_id;}
            );
            console.log("existingItemIndex:", existingItemIndex);
            if (existingItemIndex !== -1) {
            console.log("addToCart setIn");
                return currentCart.setIn(
                    [existingItemIndex, "quantity"],
                    currentCart[existingItemIndex].quantity + 1
                );
            } else {
                const newCartItem = {
                    ...product,
                    product_id: product.id,
                    id: product.id, //Math.floor(Math.random() * 10000 + 1),
                    quantity: 1,
                };
                console.log("addToCart concat");
                return currentCart.concat(newCartItem);
            }
        });
        console.log("addToCart End");
    };

    const deleteCartItem = (product_id) => {
        setCart((currentCart) =>
            currentCart.filter((item) => item.product_id !== product_id)
        );
    };

    const fetchCart = async () => {
        const jwt = getJwt();
        setIsLoading(true);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/cart`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            setCart(Immutable(response.data));
        } catch (error) {
            console.error("Error fetching cart:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getCartTotal = () =>
        cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const getCart = () => cart;

    return {
        getCart,
        getCartTotal,
        addToCart,
        modifyCart,
        deleteCartItem,
        fetchCart,
        isLoading,
    };
};
