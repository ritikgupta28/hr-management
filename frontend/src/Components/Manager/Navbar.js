import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom'
import TeamList from "./TeamList"
import AddEmployee from "./AddEmployee"
import EmployeeList from "./EmployeeList"
import AddTeam from "./AddTeam"
import Notification from "./Notification"
import Holiday from "./Holiday"
import Dashboard from "../Employees/Dashboard"
import "./Navbar.css"

function ManagerNavbar({ logoutHandler }) {
	
	return (
		<Router >
			<div className="navbar">
			 <h1>HR-MANAGER</h1>
				<div className="navbar_link">
					<button><Link to="/">Team</Link></button>
					<button><Link to="/add_team">Add Team</Link></button>
					<button><Link to="/employee">Employee</Link></button>
					<button><Link to="/add_employee">Add Employee</Link></button>
					<button><Link to="/holiday">Holiday</Link></button>
					<button><Link to="/notification">Notification</Link></button>
				</div>
				<button
					onClick={logoutHandler}
				>
					LogOut
				</button>
			</div>
			<div className="navbar_page">
				<Switch>
					<Route
						path='/'
						exact
						render={props => (
							<TeamList />
						)} 
					/>
					<Route
						path='/add_team'
						exact
						render={props => (
							<AddTeam />
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
						path='/add_employee'
						exact
						render={props => (
							<AddEmployee />
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
						path='/holiday'
						exact
						render={props => (
							<Holiday />
						)} 
					/>
					<Route
						path='/employee/:id'
						render={props => (
							<Dashboard
								id={props.match.params.id}
							/>
						)}
					/>
					<Redirect to="/" />
				</Switch>
			</div>
		</Router>
	)
}

export default ManagerNavbar;