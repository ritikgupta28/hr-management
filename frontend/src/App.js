import React, { useState } from "react"
import Login from "./Components/Auth/Login";
import Navbar from './Components/Manager/Navbar';

function App() {
  const [auth, setAuth] = useState(false);

  return (
    <div>
      {
        auth
          ?
        <Login />
          :
        <Navbar />
      }
    </div>
  );
}

export default App;