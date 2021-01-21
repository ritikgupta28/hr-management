import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Stepper,
	Step,
	StepLabel,
	StepContent,
	Button,
	Typography
} from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ['Login', 'Add Employee', 'All Employees', 'Create Team', 'All Teams', 'Holiday', 'Notifications'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `Login as a manager with given manager credentials. And go to menu bar for more functionalities.`;
    case 1:
      return `Add a new employee with valid email id.`;
    case 2:
      return `List of all employees with a search option based on employee name, team name and employee role. And for employee description click on employee email.`;
    case 3:
      return `Create a new team wtih team name and description and add employees which are not present in either team.`;
    case 4:
      return `List of all teams and for team details click on team name. Here team description and employees list will be display. And for employee description click on employee email.`;
    case 5:
      return `Mark the holiday of company in calendar.`;
    case 6:
      return `For employee request of leaves and another information click on the notification icon in the top right corner. For leave request, mark the leave as accepted or rejected.`;
    default:
      return 'Unknown step';
  }
}

export default function ManagerStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
      	  <Step key={label}>
        	  <StepLabel>{label}</StepLabel>
            <StepContent>
       		  	<Typography>{getStepContent(index)}</Typography>
           		<div className={classes.actionsContainer}>
            		<div>
               		<Button
               		disabled={activeStep === 0}
	              	onClick={handleBack}
                  className={classes.button}
      	          >
 	      	          Back
   	      	      </Button>
     	      	    <Button
                  disabled={activeStep === steps.length - 1}
      	    	    variant="contained"
   	    	    	  color="primary"
     	    	    	onClick={handleNext}
          	  	  className={classes.button}
              	  >
                	  Next
                  </Button>
   	            </div>
       	      </div>
       		  </StepContent>
        	</Step>
    	 	))}
      </Stepper>
    </div>
  );
}