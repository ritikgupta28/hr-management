import React, { useState } from "react"
import Login from "./Components/Auth/Login";
import Leave from "./Components/Employees/Leave";
import Navbar from './Components/Manager/Navbar';
import Notification from './Components/Manager/Notification';

function App() {
  const [auth, setAuth] = useState(false);

  return (
    <div>
      {
        auth
          ?
        <Login />
          :
          <div>
            <Navbar />
          </div>
      }
    </div>
  );
}

export default App;