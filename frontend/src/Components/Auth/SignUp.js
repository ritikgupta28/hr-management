import React, { useState } from 'react'
import { actionType } from "../../reducer";
import { useStateValue } from "../../StateProvider"

function SignUp() {

  const [{}, dispatch] = useStateValue();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const onSignUp = async (e) => {
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
        password: password,
        mobile: mobile
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
      setMobile("");
      alert("Done!");
    } catch(err) {
        alert(err);
    };
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
        <p>Mobile: </p>
        <input
          type="text"
          placeholder="Mobile"
          value={mobile}
          onChange = {e => setMobile(e.target.value)}  
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