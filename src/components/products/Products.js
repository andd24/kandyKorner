import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"

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

    const history = useHistory()
    const makePurchase = (event) => {
        event.preventDefault()
        const newPurchase = {
            productId: parseInt(event.target.value),
            customerId: parseInt(localStorage.getItem("kandy_customer")),
            amount: 1
        }
    
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPurchase)
        }
    
        return fetch("http://localhost:8088/purchases", fetchOption)
            .then(() => {
                history.push("/purchases")
            })
    
        }

    return (
        <>
            {
                products.map(
                    (product) => {
                        return <p key={`product--${product.id}`}>{product.name}
                        ${product.price} {product.productType.type} 
                        <button value={product.id} className="btn btn-primary" onClick={makePurchase}>
                            Purchase
                        </button></p>
                    }
                )
            }
        </>
    )
}