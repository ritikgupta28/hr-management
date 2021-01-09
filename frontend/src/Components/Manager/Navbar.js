import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import Dashboard from "./Dashboard"
import EmployeeList from "./EmployeeList"
import Notification from "./Notification"
import AddEmployee from "./AddEmployee"

function Navbar() {
  return (
    <Router >
      <div className="navbar">
       <h1>HR-MANAGER</h1>
        <div className="navbar_link">
          <button><Link to="/">Dashboard</Link></button>
          <button><Link to="/add_employee">Add_Employee</Link></button>
         <button><Link to="/employee">Employee</Link></button>
         <button><Link to="/notification">Notification</Link></button>
        </div>
        <h2>MENU</h2>
      </div>
      <div className="navbar_page">
        <Switch>
          <Route
            path='/'
            exact
            render={props => (
					    <Dashboard />
				    )} 
          />
          <Route
            path='/employee'
            exact
            render={props => (
              <EmployeeList />
				    )} 
          />
          <Route
            path='/notification'
            exact
            render={props => (
					  <Notification />
				    )} 
          />
          <Route
            path='/add_employee'
            exact
            render={props => (
					    <AddEmployee />
				    )} 
          />
        </Switch>
      </div>
    </Router>
  )
}

export default Navbar;