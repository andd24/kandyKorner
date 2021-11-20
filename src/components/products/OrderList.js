import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"

export const OrderList = () => {
    const [orders, displayOrders] = useState([])
    const [products, displayProducts] = useState([])
    const history = useHistory()

    useEffect(
        () => {
            fetch("http://localhost:8088/purchases?_expand=product&_expand=customer")
                .then(res => res.json())
                .then((data) => {
                    displayOrders(data)
                })
        }, [])

    useEffect(
        () => {
            fetch("http://localhost:8088/products")
                .then(res => res.json())
                .then((data) => {
                    displayProducts(data)
                })
        }, [])

    const customerOrders = orders.filter(order => order.customer.id === parseInt(localStorage.getItem('kandy_customer')))
    
    let count = 0
    let valueObject = {}
    const lineItem = new Map()
        for (const order of customerOrders) {
            valueObject = {
                price: 0,
                amount: 0
            }
            if (lineItem.has(order.productId) === false) {
                valueObject = {
                    price: order.product.price,
                    amount: order.amount
                }
                lineItem.set(order.productId, valueObject)
            }
            else if (lineItem.has(order.productId)) {
                let savedObject = lineItem.get(order.productId)
                count = savedObject.amount + 1
                valueObject = {
                    price: order.product.price,
                    amount: count
                }
                lineItem.set(order.productId, valueObject)
            }
        }

    console.log(lineItem)

    return (
        <>
            {
                customerOrders.map(
                    (purchase) => {
                        return <p key={`purchase--${purchase.id}`}>{purchase.product.name} @ ${purchase.product.price}</p>
                    }
                )
            }
        </>
    )
}
