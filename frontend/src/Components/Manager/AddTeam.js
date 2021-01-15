import React, { useState, useEffect } from 'react'
import { actionType } from "../../reducer"
import { useStateValue } from "../../StateProvider";

function AddTeam() {
  
  const [{ token }, dispatch] = useStateValue();
  const [teamName, setTeamName] = useState("");
  const [teamArray, setTeamArray] = useState([]);
  const [description, setDescription] = useState("");
  const [employees, setEmployees] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/employeeList', {
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
        setEmployees(resData["employees"].filter(employees => employees.teamName === ""));
      })
      .catch(err => {
        alert(err);
      });
  }, [])
  
  const onAddTeam = () => {
    fetch('http://localhost:8000/newTeam', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: teamName,
        members: teamArray,
        description: description
      })
    })
    .then(res => {
      dispatch({
        type: actionType.SET_STATUS,
        status: res.status
      })
      return res.json();
    })
    .then(resData => {
      if (status === 500) {
        throw new Error(resData.message);
      }
      setTeamName("");
      setTeamArray([]);
      setDescription("");
      alert("Done!");
    })
      .catch(err => {
        alert(err);
    });
  }

  const onAddEmployee = (e1, e2) => {
    const temp = {
      id: e1,
      email: e2
    }
    setTeamArray([...teamArray, temp]);
    setEmployees(employees.filter(employees => employees._id !== e1));
  }

  return (
    <div>
      <div>
        <p>Team Name: </p>
        <input 
          type = "text"
          value = {teamName} 
          onChange = {e => setTeamName(e.target.value)}
        />
      </div>
      <br />
      <div>
        <p>Description: </p>
        <textarea 
          type = "text"
          value = {description} 
          onChange = {e => setDescription(e.target.value)}
        />
      </div>
      <br />
      <div>
        {teamArray?.map(employee => (
          <p key={employee.id} >{employee.email}</p>
        ))}
      </div>
      <hr />
      {employees?.map(employee => (
        <div key={employee._id}>
          <p>{employee.email}</p>
          <button
            value={employee._id}
            onClick={() => onAddEmployee(employee._id, employee.email)}
          >
            Add
          </button>
        </div>
      ))}
      <button
        type="submit"
        onClick={onAddTeam}
      >
        Add Team
      </button>
    </div>
  )
}

export default AddTeam;