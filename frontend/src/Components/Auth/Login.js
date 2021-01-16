import React, { useState } from 'react'
import { actionType } from "../../reducer";
import { useStateValue } from "../../StateProvider"
import "./Auth.css"

function Login() {

  const [{}, dispatch] = useStateValue();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
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
      } catch(err) {
        dispatch({
          type: actionType.SET_IS_AUTH,
          isAuth: false
        })
        alert(err);
      }
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
          onClick={onLogin}
        >
          Login
        </button>
      </div>
      </div>
    </div>
  )
}

export default Login;