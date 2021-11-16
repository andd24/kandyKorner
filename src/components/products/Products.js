import React, { useEffect, useState } from "react"

export const ProductList = () => {
    const [products, setProducts] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/products?_expand=productType&_sort=productTypeId&_order=asc")
                .then(res => res.json())
                .then((data) => {
                    setProducts(data)
                })
        }, [])

    return (
        <>
            {
                products.map(
                    (product) => {
                        return <p key={`product--${product.id}`}>{product.id}. {product.name}
                        ${product.price} {product.productType.type}</p>
                    }
                )
            }
        </>
    )
}