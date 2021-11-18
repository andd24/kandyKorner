import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"

export const OrderList = () => {
    const [orders, displayOrders] = useState([])
    const history = useHistory()

    useEffect(
        () => {
            fetch("http://localhost:8088/purchases?_expand=product&_expand=customer")
                .then(res => res.json())
                .then((data) => {
                    displayOrders(data)
                })
        }, [])

    const customerOrders = orders.filter(order => order.customer.id === parseInt(localStorage.getItem('kandy_customer')))

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