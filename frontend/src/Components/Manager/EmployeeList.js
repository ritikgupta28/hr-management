import React, { useEffect, useState } from 'react';
import { useStateValue } from "../../StateProvider";
import { TextField, Container, Link, List, ListItem, ListItemText } from "@material-ui/core";

function EmployeeList() {

  const [{ token }, dispatch] = useStateValue();
  const [employees, setEmployees] = useState();
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [role, setRole] = useState("");

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
        setEmployees(resData["employees"])
      } catch(err) {
        alert(err)
      }
    }
    fetchData();
  }, [])

  const renderEmployee = (employee) => {

    if(name !== "" && employee.name.toLowerCase().indexOf(name.toLowerCase()) === -1) {
      return null
    }
    if(team !== "" && employee.teamName.toLowerCase().indexOf(team.toLowerCase()) === -1) {
      return null
    }
    if(role !== "" && employee.role.toLowerCase().indexOf(role.toLowerCase()) === -1) {
      return null
    }

    return (
        <Link href={`/employee/${employee._id}`} style={{ textDecoration: 'none', color: 'black' }}>
          <ListItemText primary={employee.email} />
			  </Link>
    )
  }

  return (
    <Container component="main" maxWidth="xs">
      <List>
        <ListItem>
          <TextField
            value={name} 
            onChange={e => setName(e.target.value)}
            id="standard-basic"
            label="Name"
          />
        </ListItem>
        <ListItem>
          <TextField
            value={team}
            onChange={e => setTeam(e.target.value)}
            id="standard-basic"
            label="Team-Name"
          />  
        </ListItem>
        <ListItem>
          <TextField
            value={role} 
            onChange={e => setRole(e.target.value)}
            id="standard-basic"
            label="Role"
          />
        </ListItem>
      </List>
      <List>
        {employees?.map(employee => (
          <ListItem key={employee._id}>
            {renderEmployee(employee)}
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default EmployeeList;