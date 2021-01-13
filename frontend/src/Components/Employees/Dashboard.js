import React, { useState, useEffect } from 'react';
import Attendance from './Attendance';
import Leave from './Leave';
import Salary from './Salary';

function Dashboard( props ) {
  const [employee, setEmployee] = useState({});

  useEffect(() => {
  	const id = props.match.params.id;
    fetch('http://localhost:8000/employee/' + id, {
      method: 'GET',
      headers: {
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
      <Attendance id={props.match.params.id} />
      <p>{employee.name}</p>
      <p>{employee.email}</p>
     	<p>{employee.teamAssign}</p>
      <Leave id={props.match.params.id} />
      <Salary id={props.match.params.id}/>
    </div>
  )
}

export default Dashboard;