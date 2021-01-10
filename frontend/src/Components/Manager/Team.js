import React, { useState } from 'react'
import { useStateValue } from "../../StateProvider"

function Team() {
  const [teamName, setTeamName] = useState("");
  const [teamArray, setTeamArray] = useState([]);
  const [description, setDescription] = useState("");
  const [{ employees }, dispatch] = useStateValue();
  
  const onAddTeam = () => {
    console.log(teamArray);
    console.log(teamName, teamArray);
  }

  const onAddEmployee = (e) => {
    setTeamArray([...teamArray, e.target.value]);
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
      <button
        type = "submit"
        onClick={onAddTeam}
      >
        Add Team
      </button>
    </div>
  )
}

export default Team
