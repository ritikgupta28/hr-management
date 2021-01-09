import React, { useState, useEffect } from 'react'

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/employeeList', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
      })
      .then(res => {
        setEmployees(res.employees);
      })
      .catch(err => console.log(err));
  }, [])

  return (
    <div>
      <h1>Employee</h1>
      <div>
        {employees?.map(employee => (
          <p key={employee._id}>employee.name</p>
        ))}
      </div>
    </div>
  )
}

export default EmployeeList;