import React, { useEffect, useState } from 'react';
import Footer from "../Footer"
import { useStateValue } from "../../StateProvider";
import {
  TextField,
  Container,
  Link,
  List,
  ListItem,
  CircularProgress,
  Typography
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
        const response = await fetch('https://hr-management-web-app-api.herokuapp.com/employeeList', {
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
      <div
        style={{
          width: '115%',
          padding: '2px',
          display: 'flex',
          justifyContent: 'space-between'
        }}
       >
        <Typography>{employee.name}</Typography>
        <Link
          href={`/employee/${employee._id}`}
          style={{ textDecoration: 'none' }}>
          <Typography>{employee.email}</Typography>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Container component="main" maxWidth="xs" style={{ minHeight: '450px' }}>
      <Typography>
        Search by Name, Team-Name or Role
      </Typography>
      <List style={{ display: 'flex' }}>
        <ListItem>
          <TextField
            style={{width: '120px'}}
            value={name} 
            onChange={e => setName(e.target.value)}
            label="Name"
          />
        </ListItem>
        <ListItem>
          <TextField
            style={{width: '120px'}}
            value={team}
            onChange={e => setTeam(e.target.value)}
            label="Team-Name"
          />  
        </ListItem>
        <ListItem>
          <TextField
            style={{width: '120px'}}
            value={role} 
            onChange={e => setRole(e.target.value)}
            label="Role"
          />
        </ListItem>
      </List>
        {loading
          ?
          <CircularProgress />
          :
          <div>
            {employees?.map(employee => (
              <div key={employee._id}>
                {renderEmployee(employee)}
              </div>
            ))}
          </div>
        }
      </Container>
      <Footer />
    </div>
  )
}

export default EmployeeList;