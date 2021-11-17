import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"

export const EmployeeList = () => {
    const [employees, changeEmployee] = useState([])

    const history = useHistory()

    useEffect(
        () => {
            fetch("http://localhost:8088/employees?_expand=location")
                .then(res => res.json())
                .then((data) => {
                    changeEmployee(data)
                })
        }, [])

    return (
        <>
            <div>
                <button onClick={() => history.push("/employee/create")}>Add Employee</button>
            </div>
            {
                employees.map(
                    (employee) => {
                        return <p key={`employee--${employee.id}`}>{employee.name} @ {employee.location.address}</p>
                    }
                )
            }
        </>
    )
}