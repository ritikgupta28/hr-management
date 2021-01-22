import React, { useState } from 'react';
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
  return ['Signup and Login', 'Profile', 'Edit Profile', 'Calendar', 'Salary', 'Apply Leave', 'Notifications'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `If you were added as an employee by manager then signup with same email id given to manager and then login with valid credentials.`;
    case 1:
      return `Details of employee shown in dashboard.`;
    case 2:
      return `For add or edit details click on edit profile and change and save details.`;
    case 3:
      return `All holidays of company and employee leaves is display in calendar.`;
    case 4:
      return `Employee annual salary is display and select month for per month expected salary.`;
    case 5:
      return `Request to manager for apply leave with selected dates.`;
    case 6:
      return `For update on your leave request click on the notification icon in the top right corner.`;
    default:
      return 'Unknown step';
  }
}

export default function EmployeeStepper() {
  
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
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