import React, { useState } from 'react'
import GoogleLogin from "react-google-login";
import { actionType } from "../../reducer";
import { useStateValue } from "../../StateProvider"
import "./Auth.css"

function Login() {

  const [{}, dispatch] = useStateValue();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
  }

  return (
    <div className="login">
      <p className="heading">LOGIN</p>
      <div>
      <div className="login_input">
        <p className="input_lable">Email: </p>
        <input
          type="email"
          placeholder="username@gmail.com"
          value={email}
          onChange = {e => setEmail(e.target.value)}  
        />
      </div>
      <div className="login_input">
        <p className="input_lable">Password: </p>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange = {e => setPassword(e.target.value)}  
        />
      </div>
      <div className="login_button">
        <button
          type="submit"
          onClick={onSimpleLogin}
        >
          Login
        </button>
        </div>
        <GoogleLogin
          clientId="915015918185-g4cj40r77jv1cuvklra75hlc79kcmn41.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseSuccessGoogle}
          onFailure={responseErrorGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    </div>
  )
}

export default Login;