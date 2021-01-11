import React, { useEffect } from 'react';
import { actionType } from "../../reducer";
import { useStateValue } from "../../StateProvider"
import Card from './Card';

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