import React, { useState, useEffect } from 'react';
import Attendance from './Attendance';
import Leave from './Leave';
import Salary from './Salary';
import { useStateValue } from "../../StateProvider";

function Dashboard({ id }) {
  
  const [{ token, employeeId }, dispatch] = useStateValue();
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    async function fetchData() {
    try {
      const response = await fetch('http://localhost:8000/employee/' + id, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
      })
      const status = await response.status;
      const resData = await response.json();
      if (status === 500) {
        throw new Error(resData.message);
      }
      setEmployee(resData["employee"]);
    } catch(err) {
        alert(err);
    }
    }
    if (id !== "null") {
      fetchData();
    }
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