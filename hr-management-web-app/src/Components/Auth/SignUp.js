import React, { useState } from 'react'
import { actionType } from "../../reducer"
import { useStateValue } from "../../StateProvider"
import GoogleLogin from "react-google-login";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
  CircularProgress
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(0),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp() {

  const [{}, dispatch] = useStateValue();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const employeePassword = async () => {
    return prompt("Please enter a password:", "");
  }

  const onSignUp = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await fetch('https://hr-management-web-app-api.herokuapp.com/auth/emloyeeSignup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
      })
      const status = await response.status;
      const resData = await response.json();
      if(status === 500) {
        throw new Error(resData.message);
      }
      setName("");
      setEmail("");
      setPassword("");
      alert("Done!");
      setLoading(false);
    } catch (err) {
      setLoading(false);
        alert(err);
    };
  }

  const responseSuccessGoogle = async (response) => {
    setLoading(true);
    let psswrd;
    try {
      await employeePassword().then(resData => {
        psswrd = resData;
      });
      const res = await fetch('https://hr-management-web-app-api.herokuapp.com/auth/googleEmployeeSignup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tokenId: response.tokenId,
          password: psswrd
        })
      })
      const status = await res.status;
      const resData = await res.json();
      if(status === 500) {
        throw new Error(resData.message);
      }
      alert("Done!");
      setLoading(false);
    } catch(err) {
      dispatch({
        type: actionType.SET_IS_AUTH,
        isAuth: false
      })
      setLoading(false);
      alert(err);
    }
  }

  const responseErrorGoogle = (response) => {
    setLoading(false);
    alert("Somthing went Wrong")
  }
  

  return (
    <Container component="main" maxWidth="xs" style={{ minHeight: '450px' }}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
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
            value={password}
            onChange={e => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          {loading
            ?
            <CircularProgress />
            :
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={onSignUp}
              className={classes.submit}
            >
              SignUp
            </Button>
          }
        </form>
        <br />
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="SignUp with Google"
          onSuccess={responseSuccessGoogle}
          onFailure={responseErrorGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>
      </Container>
  )
}

export default SignUp;