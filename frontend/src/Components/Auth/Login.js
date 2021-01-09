import React, { useState } from 'react'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    console.log(email, password);
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