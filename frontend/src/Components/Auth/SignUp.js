import React, { useState } from 'react'

function SignUp({ signupHandler }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSignUp = (e) => {
    const resData = {
      email: email,
      password: password,
      name: name
    }
    signupHandler(e, resData);
  }

  return (
    <div>
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
        <button type="submit" onClick={onSignUp}>SignUp</button>
      </div>
    </div>
  )
}

export default SignUp;