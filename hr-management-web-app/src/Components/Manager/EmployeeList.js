import React, { useEffect, useState } from 'react';
import { useStateValue } from "../../StateProvider";
import {
  TextField,
  Container,
  Link,
  List,
  ListItem,
  ListItemText,
  CircularProgress
} from "@material-ui/core";

function EmployeeList() {

  const [{ token }, dispatch] = useStateValue();
  const [employees, setEmployees] = useState();
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } catch (err) {
        setLoading(false);
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
    <Container component="main" maxWidth="xs" style={{
      display: 'flex', flexDirection: 'column'
    }}>
      <List>
        Search by name, team name or role
      </List>
      <List style={{ display: 'flex' }}>
        <ListItem>
          <TextField
            style={{width: '120px'}}
            value={name} 
            onChange={e => setName(e.target.value)}
            id="standard-basic"
            label="Name"
          />
        </ListItem>
        <ListItem>
          <TextField
            style={{width: '120px'}}
            value={team}
            onChange={e => setTeam(e.target.value)}
            id="standard-basic"
            label="Team-Name"
          />  
        </ListItem>
        <ListItem>
          <TextField
            style={{width: '120px'}}
            value={role} 
            onChange={e => setRole(e.target.value)}
            id="standard-basic"
            label="Role"
          />
        </ListItem>
      </List>
      <List style={{ display: 'flex', justifyContent: 'center' }}>
        {loading
          ?
          <CircularProgress />
          :
          <div>
            {employees?.map(employee => (
              <ListItem key={employee._id}>
                {renderEmployee(employee)}
              </ListItem>
            ))}
          </div>
        }
      </List>
    </Container>
  )
}

export default EmployeeList;