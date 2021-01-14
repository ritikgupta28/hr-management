import React, { useState } from 'react'
import { actionType } from "../../reducer";
import { useStateValue } from "../../StateProvider"

function Login() {

  const [{ status }, dispatch] = useStateValue();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => {
        dispatch({
          type: actionType.SET_STATUS,
          status: res.status
        })
        return res.json();
      })
      .then(resData => {
        if(status === 401) {
          throw new Error(resData.message);
        }
        if(status !== 200 && status !== 201) {
          throw new Error(resData.message);
        }
        dispatch({
          type: actionType.SET_TOKEN,
          token: resData.token
        })
        dispatch({
          type: actionType.SET_ID,
          id: resData.id
        })
        dispatch({
          type: actionType.SET_IS_AUTH,
          isAuth: true
        })
        localStorage.setItem('token', resData.token);
        localStorage.setItem('id', resData.id);
        const remainingMilliseconds = 5 * 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
      })
      .catch(err => {
        dispatch({
          type: actionType.SET_IS_AUTH,
          isAuth: false
        })
        dispatch({
          type: actionType.SET_ERROR,
          error: err
        })
      });
  }

  return (
    <div>
      <div className="">
        <p>Email: </p>
        <input
          type="email"
          placeholder="username@gmail.com"
          value={email}
          onChange = {e => setEmail(e.target.value)}  
        />
      </div>
      <div className="">
        <p>Password: </p>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange = {e => setPassword(e.target.value)}  
        />
      </div>
      <div className="">
        <button
          type="submit"
          onClick={onLogin}
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Login;