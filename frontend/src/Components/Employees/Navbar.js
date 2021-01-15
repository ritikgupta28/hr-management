import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Dashboard from "../Employees/Dashboard";
import { useStateValue } from "../../StateProvider";

function EmployeeNavbar({ logoutHandler }) {
	const [{ id }, dispatch] = useStateValue();
	return (
		<div>
			<button onClick={logoutHandler}>
				LogOut
			</button>
			<Dashboard id={id} />
		</div>
	)
}

export default EmployeeNavbar;