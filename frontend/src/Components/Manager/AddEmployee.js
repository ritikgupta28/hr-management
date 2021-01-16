import React, { useState } from 'react';
import "./AddEmployee.css";
import { useStateValue } from "../../StateProvider";

function AddEmployee() {
  
  const [{ token }, dispatch] = useStateValue();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [salary, setSalary] = useState('');

  const onAddEmployee = async (e) => {
    try {
      const response = await fetch('http://localhost:8000/newEmployee', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          role: role,
          salary: salary
        })
      })
      const status = await response.status;
      const resData = await response.json();
      if (status === 500) {
        throw new Error(resData.message);
      }
      setName("");
      setEmail("");
      setRole("");
      setSalary("");
      alert("Done!");
    } catch(err) {
      alert(err);
    };
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
          placeholder="username@gmail.com"
          value={email}
          onChange = {e => setEmail(e.target.value)}  
        />
      </div>
      <div className="add_employee_input">
        <p>Salary: </p>
        <input
          type="number"
          value={salary}
          onChange = {e => setSalary(e.target.value)}  
        />
      </div>
      <div className="add_employee_input">
        <p>Role: </p>
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange = {e => setRole(e.target.value)}  
        />
      </div>
      <div className="add_employee_input">
        <button
          type="submit"
          onClick={onAddEmployee}
        >
          Add
        </button>
      </div>
    </div>
  )
}

export default AddEmployee;