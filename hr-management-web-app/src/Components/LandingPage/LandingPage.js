import React from 'react';
import Typed from 'react-typed'
import {
	Card,
	CardContent,
	Typography
} from '@material-ui/core/';
import "./LandingPage.css";

import ManagerStepper from './ManagerStepper';
import EmployeeStepper from './EmployeeStepper';

function LandingPage() {

	return (
		<div>
			<div className="main">
				<div className="heading">
					<h1>HR Management</h1>
					<p>
						<Typed
							strings={[
							`Attendance Management`,
							`Payroll Management`,
							`Team Management`
							]}
							typeSpeed={50}
							loop
						>
						</Typed>
					</p>
				</div>
			</div>
			<div className="landing_page">
				<Card className="card">
						<CardContent>
							<div>
								<Typography variant="h5">For Manager:</Typography>
								<ManagerStepper />
							</div>
						</CardContent>
					</Card>
					<Card className="card">
						<CardContent>
							<div>
								<Typography variant="h5">For Employee:</Typography>
								<EmployeeStepper />
							</div>
						</CardContent>
					</Card>
			</div>
		</div>
  );
}

export default LandingPage;