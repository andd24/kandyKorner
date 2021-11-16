import React from "react"
import { LocationList } from "./locations/Locations"
import { ProductList } from "./products/Products"

export const KandyKorner = () => {
    return (
    <>
    <h1>Kandy Korner</h1>
    <h2>Locations</h2>
    {LocationList()}
    <h2>Products</h2>
    {ProductList()}
    </>
    )
}