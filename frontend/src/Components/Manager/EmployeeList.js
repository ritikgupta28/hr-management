import React, { useEffect, useState } from 'react';
import Card from './Card';

function EmployeeList() {
  const [employees, setEmployees] = useState();
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    fetch('http://localhost:8000/employeeList', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
      })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        setEmployees(resData["employees"])
      })
      .catch(err => console.log(err));
  }, [])

  if(name !== "" && employees.name.indexOf(name) === -1) {
    return null
  }

  return (
    <div>
      <div>
        <p>Name: </p>
        <input 
          type = "text"
          value = {name} 
          onChange = {e => setName(e.target.value)}
        />
      </div> 
      <br />
      <div>
        <p>Team: </p>
        <input 
          type = "text"
          value = {team}
          onChange = {e => setTeam(e.target.value)}
        />
      </div>
      <br />
      <div>
        <p>Role: </p>
        <input 
          type = "text"
          value = {role} 
          onChange = {e => setRole(e.target.value)}
        />
      </div>
      <br />
      <div>
        {employees?.map(employee => (
          <Card
            key={employee._id}
            employee={employee}
          />
        ))}
      </div>
    </div>
  )
}

export default EmployeeList;