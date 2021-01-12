import React, { useState, useEffect } from 'react'

function AddTeam() {
  const [teamName, setTeamName] = useState("");
  const [teamArray, setTeamArray] = useState([]);
  const [description, setDescription] = useState("");
  const [employees, setEmployees] = useState([]);

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
        setEmployees(employees.filter(employees => employees.teamName === ""));
      })
      .catch(err => console.log(err));
  }, [])
  
  const onAddTeam = () => {
    console.log(teamName, teamArray, description);
    fetch('http://localhost:8000/newTeam', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: teamName,
        members: teamArray,
        description: description
      })
    })
    .then(resData => {
      setTeamName("");
      setTeamArray([]);
      setDescription("");
      alert("Add Team Successfully!");
    })
    .catch(err => console.log(err));
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
          <div>
            <p key={employee.id}>{employee.email}</p>
          </div>
        ))}
      </div>
      <hr />
      {employees?.map(employee => (
        <div>
          <p key={employee._id}>{employee.email}</p>
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