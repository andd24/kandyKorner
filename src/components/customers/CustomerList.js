import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"

export const CustomerList = () => {
    const [customers, displayCustomer] = useState([])

    const history = useHistory()

    useEffect(
        () => {
            fetch("http://localhost:8088/customers")
                .then(res => res.json())
                .then((data) => {
                    displayCustomer(data)
                })
        }, [])

    return (
        <>
            {
                customers.map(
                    (customer) => {
                        return <p key={`customer--${customer.id}`}>{customer.name}</p>
                    }
                )
            }
        </>
    )
}