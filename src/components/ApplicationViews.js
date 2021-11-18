import React from "react"
import { Route } from "react-router-dom"
import { CustomerList } from "./customers/CustomerList"
import { EmployeeForm } from "./employees/EmployeeForm"
import { EmployeeList } from "./employees/EmployeeList"
import { LocationList } from "./locations/Locations"
import { OrderList } from "./products/OrderList"
import { ProductList } from "./products/Products"

export const ApplicationViews = () => {
    return (
        <>
            <Route path="/locations">
                <LocationList />
            </Route>
            <Route path="/products">
                <ProductList />
            </Route>
            <Route path="/employees">
                <EmployeeList />
            </Route>
            <Route path="/employee/create">
                <EmployeeForm />
            </Route>
            <Route path="/customers">
                <CustomerList />
            </Route>
            <Route path="/purchases">
                <OrderList />
            </Route>
        </>
    )
}