import React, { useState } from 'react'
import { useStateValue } from "../../StateProvider"

function AddTeam() {
  const [teamName, setTeamName] = useState("");
  const [teamArray, setTeamArray] = useState([]);
  const [description, setDescription] = useState("");
  const [{ employees }, dispatch] = useStateValue();
  
  const onAddTeam = () => {
    console.log(teamName);
    console.log(description);
    console.log(teamArray);
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

  const onAddEmployee = (e) => {
    setTeamArray([...teamArray, e.target.value]);
    console.log(teamArray);
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
            <p key={employee._d}>{employee._id}</p>
          </div>
        ))}
      </div>
      <hr />
      {employees?.map(employee => (
        <div>
          <p key={employee._id}>{employee.name}</p>
          <button value={employee._id} onClick={onAddEmployee}>Add</button>
        </div>
      ))}
      <button type = "submit" onClick={onAddTeam}>
        Add Team
      </button>
    </div>
  )
}

export default AddTeam;