import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Card,
	CardContent
} from '@material-ui/core/';

import VerticalStepper from './Stepper';

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
		  	  	<p>For manager:</p>
  		  	  <VerticalStepper />
  			  </div>
  			</CardContent>
	  	</Card>
  		<Card className={classesCard.root}>
  			<CardContent>
		  	  <div>
		    		<p>For employee:</p>
  		    	<VerticalStepper />
	  		  </div>
  			</CardContent>
  		</Card>
  	</div>
  );
}

export default LandingPage;