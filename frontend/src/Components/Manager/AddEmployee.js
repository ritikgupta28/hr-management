import React, { useState } from 'react';
import "./AddEmployee.css";

function AddEmployee() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [teamName, setTeamName] = useState('');

  const onAddEmployee = (e) => {
    console.log(name, email, teamName);
    fetch('http://localhost:8000/newEmployee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email
      })
    })
    .then(res => {
      return res.json();
    })
    .then(resData => {
      console.log(resData);
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="add_employee">
      <div className="add_employee_input">
        <p>Name: </p>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange = {e => setName(e.target.value)}  
        />
      </div>
      <div className="add_employee_input">
        <p>Email: </p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange = {e => setEmail(e.target.value)}  
        />
      </div>
      <div className="add_employee_input">
        <p>Team Name: </p>
        <input
          placeholder="Team Name"
          type="text"
          value={teamName}
          onChange = {e => setTeamName(e.target.value)}  
        />
      </div>
      <div className="add_employee_input">
        <button type="submit" onClick={onAddEmployee}>Add</button>
      </div>
    </div>
  )
}

export default AddEmployee;