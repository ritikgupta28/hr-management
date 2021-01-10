import React, { useEffect } from 'react';
import { actionType } from "../../reducer";
import { useStateValue } from "../../StateProvider"


function EmployeeList() {
  const [{ employees }, dispatch] = useStateValue();

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
        dispatch({
          type: actionType.SET_EMPLOYEES,
          employees: resData["employees"]
        })
      })
      .catch(err => console.log(err));
  }, [])

  return (
    <div>
      <h1>Employee</h1>
      <div>
        {employees?.map(employee => (
          <p key={employee._id}>{employee.name}</p>
        ))}
      </div>
    </div>
  )
}

export default EmployeeList;