import React, { useState, useEffect } from 'react'
import { useStateValue } from "../../StateProvider";
import {
  TextField,
  Button,
  Container,
  CircularProgress,
  Typography
} from "@material-ui/core";
import Footer from '../Footer';

function AddTeam() {
  
  const [{ token }, dispatch] = useStateValue();
  const [teamName, setTeamName] = useState("");
  const [teamArray, setTeamArray] = useState([]);
  const [description, setDescription] = useState("");
  const [employees, setEmployees] = useState([]);
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
        setEmployees(resData["employees"].filter(employees => employees.teamName === ""));
        setLoading(false);
      } catch (err) {
        setLoading(false);
          alert(err);
      }
      }
    fetchData();
  }, [])
  
  const onAddTeam = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://hr-management-web-app-api.herokuapp.com/newTeam', {
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
    <div>
    <Container component="main" maxWidth="xs">
        <TextField
          value = {teamName} 
          onChange = {e => setTeamName(e.target.value)}
          label="Team-Name" 
        />
      <br />
      <TextField
          value = {description} 
          onChange = {e => setDescription(e.target.value)}
          label="Description" 
      />
      <br />
        {teamArray?.map(employee => (
          <Typography key={employee.id}>
            {employee.email}
          </Typography>
        ))}
        <br />
        <hr />
        {!loading
          ?
          <div>
            {employees?.map(employee => (
              <div key={employee._id} style={{ display: 'flex', justifyContent: 'space-between'}}>
              <Typography>{employee.email}</Typography>
              <Button
                value={employee._id}
                onClick={() => onAddEmployee(employee._id, employee.email)}
              >
                Add
              </Button>
            </div>
          ))}
          </div>
          :
          <CircularProgress />
        }
      <br />
      <Button
        variant="outlined"
        color="primary"
        type="submit"
        onClick={onAddTeam}>
        Add Team
      </Button>
      </Container>
      <Footer />
    </div>
  )
}

export default AddTeam;