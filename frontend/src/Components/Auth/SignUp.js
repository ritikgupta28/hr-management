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
  Link,
  Grid,
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
      const response = await fetch('http://localhost:8000/auth/emloyeeSignup', {
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
      const res = await fetch('http://localhost:8000/auth/googleEmployeeSignup', {
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
    <Container component="main" maxWidth="xs">
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
            value={password}
            onChange={e => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
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
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
              <Link href="/login" variant="body2">
                {"You already have an account? Login"}
              </Link>
            </Grid>
          </Grid>
        </form>
        <br />
        <GoogleLogin
          clientId="915015918185-g4cj40r77jv1cuvklra75hlc79kcmn41.apps.googleusercontent.com"
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