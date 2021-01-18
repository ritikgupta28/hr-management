import React, { useState } from 'react'
import GoogleLogin from "react-google-login";
import { actionType } from "../../reducer";
import { useStateValue } from "../../StateProvider"
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  Container
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

function Login() {

  const [{}, dispatch] = useStateValue();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();

  const onLogin = async (resData) => {
      dispatch({
        type: actionType.SET_TOKEN,
        token: resData.token
      })
      dispatch({
        type: actionType.SET_IS_AUTH,
        isAuth: true
      })
      dispatch({
        type: actionType.SET_MANAGER_ID,
        managerId: resData.managerId
      })
      dispatch({
        type: actionType.SET_EMPLOYEE_ID,
        employeeId: resData.employeeId
      })
      localStorage.setItem('token', resData.token);
      localStorage.setItem('managerId', resData.managerId);
      localStorage.setItem('employeeId', resData.employeeId);
      const remainingMilliseconds = 5 * 60 * 60 * 1000;
      const expiryDate = new Date(
        new Date().getTime() + remainingMilliseconds
      );
      localStorage.setItem('expiryDate', expiryDate.toISOString());
  }

  const onSimpleLogin = async (e) => {
    e.preventDefault();
    try { 
      const response = await fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
      })
      const status = await response.status;
      const resData = await response.json();
      if (status === 500) {
        throw new Error(resData.message);
      }
      await onLogin(resData);
      } catch(err) {
        dispatch({
          type: actionType.SET_IS_AUTH,
          isAuth: false
        })
        alert(err);
      }
  }

  const responseSuccessGoogle = async (response) => {
    try {
        const res = await fetch('http://localhost:8000/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tokenId: response.tokenId
        })
      })
      const status = await res.status;
      const resData = await res.json();
      if (status === 500) {
        throw new Error(resData.message);
      }
      await onLogin(resData);
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
          Login
        </Typography>
        <form className={classes.form} noValidate>
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
            autoFocus
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={onSimpleLogin}
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
        <br />
        <GoogleLogin
          clientId="915015918185-g4cj40r77jv1cuvklra75hlc79kcmn41.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseSuccessGoogle}
          onFailure={responseErrorGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    </Container>
  )
}

export default Login;