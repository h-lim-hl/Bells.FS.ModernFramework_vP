import React from "react";
import Header from "./Header";
import ProductCard from "./ProductCard";

export default function HomePage() {
    return (
        <>
            <Header title="ACME Hardware" />

            {/* <main className="container my-5">
                <h2 className="text-center mb-4">Featured Products</h2>
                <div className="row">
                    <div className="col-md-3 mb-4">
                        <ProductCard
                            imageUrl="https://picsum.photos/id/1/300/200"
                            productName="Anvil"
                            price="$100"
                            product_id=
                        />
                    </div>
                    <div className="col-md-3 mb-4">
                        <ProductCard
                            imageUrl="https://picsum.photos/id/1/300/200"
                            productName="Tool Bag"
                            price="$50"
                        />
                    </div>
                    <div className="col-md-3 mb-4">
                        <ProductCard
                            imageUrl="https://picsum.photos/id/26/300/200"
                            productName="Hammer"
                            price="$45"
                        />
                    </div>
                    <div className="col-md-3 mb-4">
                        <ProductCard
                            imageUrl="https://picsum.photos/id/96/300/200"
                            productName="Screwdirver"
                            price="$13"
                        />
                    </div>
                </div>
            </main> */}
        </>
    )
}