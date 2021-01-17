import React, { useState } from 'react';
import { useStateValue } from "../../StateProvider";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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

  const classes = useStyles();

  return (
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
            id="name"
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
            id="email"
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
            id="role"
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
            label="Salary"
            id="salary"
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
  )
}

export default AddEmployee;