import React, { useState, useEffect } from 'react'
import { useStateValue } from "../../StateProvider";
import { List, ListItem, ListItemText, TextField, Button, Container } from "@material-ui/core";

function AddTeam() {
  
  const [{ token }, dispatch] = useStateValue();
  const [teamName, setTeamName] = useState("");
  const [teamArray, setTeamArray] = useState([]);
  const [description, setDescription] = useState("");
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8000/employeeList', {
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
        setEmployees(resData["employees"].filter(employees => employees.teamName === ""));
        } catch(err) {
          alert(err);
        };
      }
    fetchData();
  }, [])
  
  const onAddTeam = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/newTeam', {
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
      const status = await response.status;
      const resData = await response.json();
      if (status === 500) {
        throw new Error(resData.message);
      }
      setTeamName("");
      setTeamArray([]);
      setDescription("");
      alert("Done!");
    } catch(err) {
      alert(err)
    }
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
    <Container component="main" maxWidth="xs">
        <TextField
          value = {teamName} 
          onChange = {e => setTeamName(e.target.value)}
          id="standard-basic"
          label="Team-Name" 
        />
      <br />
      <TextField
          value = {description} 
          onChange = {e => setDescription(e.target.value)}
          id="standard-basic"
          label="Description" 
      />
      <br />
      <List>
        {teamArray?.map(employee => (
          <ListItem>
            <ListItemText key={employee.id} primary = {employee.email} />
          </ListItem>
        ))}
      </List>
      <hr />
      <List>
      {employees?.map(employee => (
        <ListItem key={employee._id}>
          <ListItemText primary={employee.email} />
          <Button
            variant="outlined"
            value={employee._id}
            onClick={() => onAddEmployee(employee._id, employee.email)}
          >
            Add Member
          </Button>
        </ListItem>
      ))}
      </List>
      <br />
      <Button
        variant="outlined"
        color="primary"
        type="submit"
        onClick={onAddTeam}>
        Add Team
      </Button>
    </Container>
  )
}

export default AddTeam;