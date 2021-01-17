import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import Dashboard from "../Employees/Dashboard";
import { useStateValue } from "../../StateProvider";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
		flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow:  0.05
	},
	mainTitle: {
    flexGrow:  1
  }
}));

function EmployeeNavbar({ logoutHandler }) {

	const [{ employeeId }, dispatch] = useStateValue();
	const classes = useStyles();

	return (
		<Router>
			<div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.mainTitle}>
            <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>HR-MANAGER</Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link to='/dashboard' style={{ textDecoration: 'none', color: 'white' }}>Policies</Link>
          </Typography>
						<Button onClick={logoutHandler}>
							<Link to='/login' style={{ textDecoration: 'none', color: 'white' }}>Logout</Link>
						</Button>
        </Toolbar>
      </AppBar>
    </div>
			<div>
				<Switch>
					<Route
						path='/dashboard'
						exact
						render={props => (
							<Dashboard
								id={employeeId}
							/>
						)}
					/>
					<Redirect to="/dashboard" />
				</Switch>
			</div>
		</Router>
	)
}

export default EmployeeNavbar;