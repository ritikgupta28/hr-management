import React, { useState, useEffect } from 'react';
import Attendance from './Attendance';
import Leave from './Leave';
import Salary from './Salary';
import { useStateValue } from "../../StateProvider";

function Dashboard({ id }) {
  const [{ token }, dispatch] = useStateValue();
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    fetch('http://localhost:8000/employee/' + id, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        setEmployee(resData["employee"]);
      })
      .catch(err => console.log(err));
  }, [])

  return (
    <div>
      <Attendance id={id} />
      <p>{employee.name}</p>
      <p>{employee.email}</p>
     	<p>{employee.teamAssign}</p>
      <Leave />
      <Salary id={id} />
    </div>
  )
}

export default Dashboard;