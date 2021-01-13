import React, { useState, useEffect } from 'react';
import Navbar from "./Components/Manager/Navbar";
import Login from "./Components/Auth/Login"
import SignUp from "./Components/Auth/SignUp"
// import { withRouter } from 'react-router-dom'
// import Welcome from './components/welcome_page/Welcome';

function App(props) {

  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [id, setId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }
    const id = localStorage.getItem('id');
    const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
    setToken(token);
    if(id != null) {
      setId(id);
    }
    setIsAuth(true);
    setAutoLogout(remainingMilliseconds);
  }, [])

  const signupHandler = (e, authData) => {
    e.preventDefault();
    fetch('http://localhost:8000/auth/signup', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: authData.name,
        email: authData.email,
        password: authData.password
      })
    })
      .then(res => {
        setStatus(res.status);
        return res.json();
      })
      .then(resData => {
        if(status === 422) {
          throw new Error(resData.message);
        }
        if(status !== 200 && status !== 201) {
          throw new Error(resData.message);
        }
        setIsAuth(false);
        props.history.push('/login');
      })
      .catch(err => {
        setIsAuth(false);
        setError(err);
      });
  };

  const loginHandler = (e, authData) => {
    e.preventDefault();
    fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: authData.email,
        password: authData.password
      })
    })
      .then(res => {
        setStatus(res.status);
        return res.json();
      })
      .then(resData => {
        if(status === 401) {
          throw new Error(resData.message);
        }
        if(status !== 200 && status !== 201) {
          throw new Error(resData.message);
        }
        console.log(resData);
        setToken(resData.token);
        setId(resData.id)
        setIsAuth(true);
        localStorage.setItem('token', resData.token);
        localStorage.setItem('id', resData.id);
        const remainingMilliseconds = 5 * 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
      })
      .catch(err => {
        setIsAuth(false);
        setError(err);
      });
  };

  const setAutoLogout = milliseconds => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };

  const logoutHandler = () => {
    setIsAuth(false);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('id');
  };

    return (
      <div>
        {isAuth
          ?
          <Navbar logoutHandler={logoutHandler} id={id}/>
          :
          <Login loginHandler={loginHandler} />
        }
      </div>
    );
}

export default App;