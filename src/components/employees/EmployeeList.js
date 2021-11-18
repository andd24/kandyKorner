import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"

export const EmployeeList = () => {
    const [employees, changeEmployee] = useState([])

    const history = useHistory()
    const getEmployees = () => {
        fetch("http://localhost:8088/employees?_expand=location")
        .then(res => res.json())
        .then((data) => {
            changeEmployee(data)
        })
    }
    useEffect(
        () => {
            getEmployees()
        }, [])

    const deleteEmployee = (id) => {
        fetch(`http://localhost:8088/employees/${id}`, {
            method: "DELETE"
        })
        getEmployees()
    }

    return (
        <>
            <div>
                <button onClick={() => history.push("/employee/create")}>Add Employee</button>
            </div>
            {
                employees.map(
                    (employee) => {
                        return <p key={`employee--${employee.id}`}>{employee.name} @ {employee.location.address}
                        <button onClick={() => {deleteEmployee(employee.id)}}>Fire Employee</button></p>
                    }
                )
            }
        </>
    )
}