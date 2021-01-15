import React, { useEffect } from 'react';
import ManagerNavbar from "./Components/Manager/Navbar";
import EmployeeNavbar from "./Components/Employees/Navbar";
import Login from "./Components/Auth/Login";
import SignUp from "./Components/Auth/SignUp";
import { actionType } from "./reducer";
import { useStateValue } from "./StateProvider";


function App(props) {
  const [{ status, isAuth, isAdminAuth }, dispatch] = useStateValue();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }
    const id = localStorage.getItem('id');
    const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
    dispatch({
      type: actionType.SET_TOKEN,
      token: token
    })
    if(id != null) {
      dispatch({
				type: actionType.SET_ID,
				id: id
			})
    }
    dispatch({
      type: actionType.SET_IS_AUTH,
      isAuth: true
    })
    setAutoLogout(remainingMilliseconds);
  }, [])

  const setAutoLogout = milliseconds => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };

  const logoutHandler = () => {
    dispatch({
      type: actionType.SET_TOKEN,
      token: null
    })
    dispatch({
      type: actionType.SET_IS_AUTH,
      isAuth: false
    })
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('id');
  };

    return (
      <div>
        {isAuth
          ?
          isAdminAuth
          ?
          <ManagerNavbar logoutHandler={logoutHandler} />
          :
          <EmployeeNavbar logoutHandler={logoutHandler} />
          :
          <div>
            <Login />
            <SignUp />
          </div>
        }
      </div>
    );
}

export default App;