import React, { useState } from 'react';
import { useStateValue } from "../../StateProvider";
import Footer from "../Footer"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container
} from "@material-ui/core";

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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(0),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function AddEmployee() {
  
  const [{ token }, dispatch] = useStateValue();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [salary, setSalary] = useState('');
  const classes = useStyles();

  const onAddEmployee = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://hr-management-web-app-api.herokuapp.com/newEmployee', {
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
    <div>
     <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Employee
        </Typography>
        <form className={classes.form} noValidate>
        <TextField
            value={name}
            onChange={e => setName(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            value={email}
            onChange={e => setEmail(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            value={role}
            onChange={e => setRole(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="role"
            label="Role"
            autoComplete="role"
          />
          <TextField
            value={salary}
            onChange={e => setSalary(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="salary"
            label="Salary Per Annum"
            autoComplete="salary"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={onAddEmployee}
            className={classes.submit}
          >
            Add Employee
          </Button>
        </form>
      </div>
      </Container>
      <Footer />
    </div>
  )
}

export default AddEmployee;