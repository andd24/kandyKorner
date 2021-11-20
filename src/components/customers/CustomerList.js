import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"

export const CustomerList = () => {
    const [customers, displayCustomer] = useState([])
    const [purchases, displayPurchases] = useState([])

    const history = useHistory()

    useEffect(
        () => {
            fetch("http://localhost:8088/customers")
                .then(res => res.json())
                .then((data) => {
                    displayCustomer(data)
                })
        }, [])

    useEffect(
        () => {
            fetch("http://localhost:8088/purchases?_expand=customer")
                .then(res => res.json())
                .then((data) => {
                    displayPurchases(data)
                })
        }, [])

    const candiesByCust = (custId) => {
        let total = 0
        for (const purchase of purchases) {
            if (custId === purchase.customerId) {
                total += 1
            }
        }
        return total
    }

    customers.sort((a, b) => {
        return b.totalCandy - a.totalCandy 
    })

    return (
        <>
            {

                customers.map(
                    (customer) => {
                        customer.totalCandy = candiesByCust(customer.id)
                        return <p key={`customer--${customer.id}`}>{customer.name} has made {customer.totalCandy} purchases</p>
                    }
                )
            }
        </>
    )
}