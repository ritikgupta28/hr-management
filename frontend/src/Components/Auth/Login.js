import React, { useState } from 'react'

function Login({ loginHandler }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    const resData = {
      email: email,
      password: password
    }
    loginHandler(e, resData);
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
        <button type="submit" onClick={onLogin}>Login</button>
      </div>
    </div>
  )
}

export default Login;