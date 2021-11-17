import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"

export const EmployeeForm = () => {
    const [locations, getLocations] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/locations")
                .then(res => res.json())
                .then((data) => {
                    getLocations(data)
                })
        }, [])

    const [employee, updateEmployee] = useState({
        name: "",
        locationId: 1,
        hourlyRate: 1,
        manager: false,
        fullTime: false
    })
    const history = useHistory()
    const saveEmployee = (event) => {
        event.preventDefault()
        const newEmployee = {
            name: employee.name,
            locationId: employee.locationId,
            hourlyRate: parseInt(employee.hourlyRate),
            manager: employee.manager,
            fullTime: employee.fullTime
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEmployee)
        }

        return fetch("http://localhost:8088/employees", fetchOption)
            .then(() => {
                history.push("/employees")
            })

    }

    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">Add New Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        onChange={
                            (evt) => {
                                const copy = {...employee}
                                copy.name = evt.target.value
                                updateEmployee(copy)
                            }
                        }
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter full name"
                        />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Hourly Rate</label>
                    <input
                        onChange={
                            (evt) => {
                                const copy = {...employee}
                                copy.hourlyRate = evt.target.value
                                updateEmployee(copy)
                            }
                        }
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter desired rate" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="manager">Manager?</label>
                    <input type="checkbox"
                        onChange={
                            (evt) => {
                                const copy = {...employee}
                                copy.manager = evt.target.checked
                                updateEmployee(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="fulltime">Full Time?</label>
                    <input type="checkbox"
                        onChange={
                            (evt) => {
                                const copy = {...employee}
                                copy.fullTime = evt.target.checked
                                updateEmployee(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Location</label>
                    <select id="location"
                        onChange={
                            (evt) => {
                                const copy = {...employee}
                                copy.locationId = evt.target.value
                                updateEmployee(copy)
                            }
                        }>
                    <option value="0">--Choose A Location--</option>
                    {locations.map((location) => {
          return <option value={location.id}>{location.address}</option>
        }
      )
    }
    </select>
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={saveEmployee}>
                Save Employee
            </button>
        </form>
    )
}