import React, { useState, useEffect } from 'react'
import { useStateValue } from "../../StateProvider";
import GroupIcon from '@material-ui/icons/Group';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  TextField,
  Button,
  Container,
  CircularProgress,
  Typography
} from "@material-ui/core";
import Footer from '../Footer';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  feild: {
    display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'left',
  }
}));

function AddTeam() {
  
  const [{ token }, dispatch] = useStateValue();
  const [teamName, setTeamName] = useState("");
  const [teamArray, setTeamArray] = useState([]);
  const [description, setDescription] = useState("");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

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
    <div style={{ minHeight: '450px' }}>
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <GroupIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Team
        </Typography>
        <div className={classes.feild}>
          <TextField
            value = {teamName} 
            onChange = {e => setTeamName(e.target.value)}
            label="Team Name"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            autoComplete="email"
          />
          <TextField
            value = {description} 
            onChange = {e => setDescription(e.target.value)}
            label="Description"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            autoComplete="email"
            style={{paddingLeft: '10px'}}
          />
        </div>
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
                  color="primary"
                  value={employee._id}
                  style={{paddingLeft: '100px'}}
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
          type="submit"
          variant="contained"
          color="primary"
          onClick={onAddTeam}>
          Add Team
        </Button>
      </div>
    </Container>
    <Footer />
    </div>
  )
}

export default AddTeam;