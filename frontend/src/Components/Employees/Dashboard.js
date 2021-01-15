import React, { useState, useEffect } from 'react';
import Attendance from './Attendance';
import Leave from './Leave';
import Salary from './Salary';
import { useStateValue } from "../../StateProvider";

function Dashboard({ id }) {
  
  const [{ token, employeeId }, dispatch] = useStateValue();
  const [employee, setEmployee] = useState({});
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/employee/' + id, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      setStatus(res.status)
      return res.json();
    })
    .then(resData => {
      if (status === 500) {
        throw new Error(resData.message);
      }
        setEmployee(resData["employee"]);
      })
      .catch(err => {
        alert(err);
      });
  }, [])

  return (
    <div>
      <Attendance id={id} />
      <p>{employee?.name}</p>
      <p>{employee?.email}</p>
     	<p>{employee?.teamAssign}</p>
      {employeeId !== "null"
        ?
        <Leave />
        :
        null
      }
      <Salary id={id} />
    </div>
  )
}

export default Dashboard;