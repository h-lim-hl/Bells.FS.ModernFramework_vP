import React, { useState, useEffect } from 'react';
import axios from "axios";
import ProductCard from './ProductCard';

export default function ProductPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {

        // The effect function cannot be async
        const loadData = async () => {
            // all URLs to static assets will be relative to public
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
                setProducts(response.data);
            } catch (error) {
                console.log("Error in loadData(): ", error);
            }
        }
        loadData();


    }, [])

    const renderProductsV2 = () => {
        const jsxElements = products.map(function (p) {
            return <li key={p.id}>{p.name} ${p.price}</li>
        })
        return jsxElements;
    }

    const renderProducts = () => {
        const jsxElements = [];
        for (let p of products) {
            jsxElements.push(<li key={p.id}>
                {p.name} ${p.price}
            </li>);
        }
        return jsxElements;
    }

    return (
        <>
            <h1>Products</h1>

            {/* {renderProducts()} */}
            {/* {
                    (()=>{
                        const jsxElements = [];
                        for (let p of products) {
                            jsxElements.push(<li key={p.id}>
                                {p.name} ${p.price}
                            </li>);
                        }
                        return jsxElements;
                    })()
                } */}

            <div className="row">
                {products.map(p =>
                    <div className="col-12 col-md-4 col-lg-3">
                        <ProductCard
                            productName={p.name}
                            price={p.price}
                            imageUrl={p.image}
                            id={p.id}
                            description={p.description}
                        />
                    </div>
                )}
            </div>


        </>
    )
}