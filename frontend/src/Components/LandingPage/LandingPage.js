import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Card,
	CardContent,
	Typography
} from '@material-ui/core/';
import "./LandingPage.css";

import ManagerStepper from './ManagerStepper';
import EmployeeStepper from './EmployeeStepper';

const useStylesCard = makeStyles({
  root: {
    width: 500,
    margin: '10px',
  }
});

function LandingPage() {
  const classesCard = useStylesCard();

	return (
		<div className="landing_page">
				<Card className={classesCard.root}>
					<CardContent>
						<div>
							<Typography>For Manager:</Typography>
							<ManagerStepper />
						</div>
					</CardContent>
				</Card>
				<Card className={classesCard.root}>
					<CardContent>
						<div>
							<Typography>For Employee:</Typography>
							<EmployeeStepper />
						</div>
					</CardContent>
				</Card>
			</div>
  );
}

export default LandingPage;