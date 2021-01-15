import React, { useState } from 'react'
import { actionType } from "../../reducer";
import { useStateValue } from "../../StateProvider"

function SignUp() {

  const [{ status }, dispatch] = useStateValue();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSignUp = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/auth/employeeSignup', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
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
        if(status === 422) {
          throw new Error(resData.message);
        }
        if(status !== 200 && status !== 201) {
          throw new Error(resData.message);
        }
        dispatch({
          type: actionType.SET_IS_AUTH,
          isAuth: false
        })
        // props.history.push('/login');
      })
      .catch(err => {
        dispatch({
          type: actionType.SET_IS_AUTH,
          isAuth: false
        })
        alert(err);
      });
  }

  return (
    <div>
      <p>SignUp</p>
      <div className="">
        <p>Name: </p>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange = {e => setName(e.target.value)}  
        />
      </div>
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
          onClick={onSignUp}
        >
          SignUp
        </button>
      </div>
    </div>
  )
}

export default SignUp;