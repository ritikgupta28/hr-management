import React, { useState } from 'react'
import { actionType } from "../../reducer"
import { useStateValue } from "../../StateProvider"
import GoogleLogin from "react-google-login";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
    width: '100%', // Fix IE 11 issue.
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

  const employeePassword = async () => {
    setPassword(prompt("Please enter password:", ""));
  }

  const Copyright = () => {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="http://localhost:3000">
          HR-MANAGER
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const classes = useStyles();

  const onSignUp = async (e) => {
    e.preventDefault();
    await employeePassword();
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
    } catch(err) {
        alert(err);
    };
  }

  const responseSuccessGoogle = async (response) => {
    try {
        const res = await fetch('http://localhost:8000/auth/googleEmployeeSignup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tokenId: response.tokenId,
          password: password
        })
      })
      const status = await res.status;
      const resData = await res.json();
      if (status === 500) {
        throw new Error(resData.message);
      }
      alert("Done!");
    } catch(err) {
      dispatch({
        type: actionType.SET_IS_AUTH,
        isAuth: false
      })
      alert(err);
    }
  }

  const responseErrorGoogle = (response) => {
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
      <Box mt={8}>
        <Copyright />
        </Box>
      </Container>
  )
}

export default SignUp;