import React, { useEffect, useState } from 'react';
import ManagerNavbar from "./Components/Manager/Navbar";
import EmployeeNavbar from "./Components/Employees/Navbar";
import { actionType } from "./reducer";
import { useStateValue } from "./StateProvider";
import Navbar from './Components/LandingPage/Navbar';
import { CircularProgress } from '@material-ui/core';

function App() {
  
  const [{ isAuth, managerId }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      setLoading(false);
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      setLoading(false);
      logoutHandler();
      return;
    }
    const mId = localStorage.getItem('managerId');
    const eId = localStorage.getItem('employeeId');
    const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
    dispatch({
      type: actionType.SET_TOKEN,
      token: token
    })
      dispatch({
				type: actionType.SET_MANAGER_ID,
				managerId: mId
			})
      dispatch({
				type: actionType.SET_EMPLOYEE_ID,
				employeeId: eId
			})
    dispatch({
      type: actionType.SET_IS_AUTH,
      isAuth: true
    })
    setAutoLogout(remainingMilliseconds);
    setLoading(false);
  }, [])

  const setAutoLogout = (milliseconds) => {
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
    localStorage.removeItem('managerId');
    localStorage.removeItem('employeeId');
  };

    return (
      <div>
        {loading
          ?
          <CircularProgress />
          :
          <div>
            {isAuth
              ?
              (managerId !== "null"
              ?
              <ManagerNavbar logoutHandler={logoutHandler} />
              :
              <EmployeeNavbar logoutHandler={logoutHandler} />
              )
              :
              <Navbar />
            } 
          </div>
        }
      </div>
    );
}

export default App;