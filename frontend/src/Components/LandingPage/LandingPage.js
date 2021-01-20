import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Card,
	CardContent,
	Typography
} from '@material-ui/core/';

import ManagerStepper from './ManagerStepper';
import EmployeeStepper from './EmployeeStepper';

const useStylesCard = makeStyles({
  root: {
    width: 500,
    margin: '10px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  conatiner: {
  	display: 'flex',
  },
});

function LandingPage() {
  const classesCard = useStylesCard();

  return (
  	<div className={classesCard.conatiner}>
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