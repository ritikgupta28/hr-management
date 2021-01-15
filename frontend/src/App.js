import React, { useEffect } from 'react';
import ManagerNavbar from "./Components/Manager/Navbar";
import EmployeeNavbar from "./Components/Employees/Navbar";
import Login from "./Components/Auth/Login";
// import SignUp from "./Components/Auth/SignUp";
import { actionType } from "./reducer";
import { useStateValue } from "./StateProvider";

function App() {

  const [{ isAuth, managerId, employeeId }, dispatch] = useStateValue();

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
    const mId = localStorage.getItem('managerId');
    const eId = localStorage.getItem('employeeId');
    const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
    dispatch({
      type: actionType.SET_TOKEN,
      token: token
    })
    if(mId !== "null") {
      dispatch({
				type: actionType.SET_MANAGER_ID,
				managerId: mId
			})
    }
    if(eId !== "null") {
      dispatch({
				type: actionType.SET_EMPLOYEE_ID,
				employeeId: eId
			})
    }
    dispatch({
      type: actionType.SET_IS_AUTH,
      isAuth: true
    })
    console.log('1', managerId, employeeId)
    setAutoLogout(remainingMilliseconds);
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
        {isAuth
          ?
          (managerId !== "null"
            ?
            <ManagerNavbar logoutHandler={logoutHandler} />
          :
          <EmployeeNavbar logoutHandler={logoutHandler} />
          )
          :
          <div>
            <Login />
          </div>
        }
      </div>
    );
}

export default App;