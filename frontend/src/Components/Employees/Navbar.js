import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Dashboard from "../Employees/Dashboard";
import { useStateValue } from "../../StateProvider";

function EmployeeNavbar({ logoutHandler }) {

	const [{ id }, dispatch] = useStateValue();
	
	return (
		<Router>
			<div className="navbar">
			 <h1>EMPLOYEE</h1>
				<button onClick={logoutHandler}>
					LogOut
				</button>
			</div>
			<div className="navbar_page">
				<Switch>
					<Route
						path='/'
						render={props => (
							<Dashboard
								id={id}
							/>
						)}
					/>
				</Switch>
			</div>
		</Router>
	)
}

export default EmployeeNavbar;