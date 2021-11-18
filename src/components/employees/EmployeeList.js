import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"

export const EmployeeList = () => {
    const [employees, changeEmployee] = useState([])

    const history = useHistory()
    const getEmployees = () => {
        return fetch("http://localhost:8088/employees?_expand=location")
        .then(res => res.json())
        }
    
    useEffect(
        () => {
            getEmployees()
            .then((data) => {
                changeEmployee(data)
            })
        }, [])

    const deleteEmployee = (event) => {
        fetch(`http://localhost:8088/employees/${event.target.value}`, {
            method: "DELETE"
        })
        .then(() => {
            return getEmployees()})
        .then((data) => {
            changeEmployee(data)
        })
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
                        <button value={employee.id} onClick={deleteEmployee}>Fire Employee</button></p>
                    }
                )
            }
        </>
    )
}