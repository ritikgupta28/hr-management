import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import Dashboard from "../Employees/Dashboard";
import Notification from "./Notification";
import Leave from './Leave';
import Footer from '../Footer';
import { useStateValue } from "../../StateProvider";
import NotificationsIcon from '@material-ui/icons/Notifications';
import { makeStyles } from "@material-ui/core/styles";
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Tooltip,
	CircularProgress
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
		flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow:  0.03
	},
	mainTitle: {
		flexGrow: 1,
		paddingRight: '30px'
  }
}));

function EmployeeNavbar({ logoutHandler }) {

	const [{ employeeId }, dispatch] = useStateValue();
	const classes = useStyles();

	return (
		<div>
		{employeeId === "null"
			?
			<CircularProgress />
			:
				<Router>
					<div className={classes.root}>
			      <AppBar position="static">
      			  <Toolbar>
								<Typography variant="h5" className={classes.mainTitle}>
									<Tooltip title="Dashboard" arrow>
										<Link to='/dashboard' style={{ textDecoration: 'none', color: 'white' }} >
											HR-MANAGER
										</Link>
									</Tooltip>
								</Typography>
								<Typography variant="h6" className={classes.title}>
									<Link to='/notification' style={{ textDecoration: 'none', color: 'white' }}>
										<Tooltip title="Notifications" arrow>
											<NotificationsIcon />
										</Tooltip>
									</Link>
			          </Typography>
								<Typography variant="h6" className={classes.title}>
									<Tooltip title="Leave" arrow>
										<Button>
										  <Link to='/leave' style={{ textDecoration: 'none', color: 'white' }} >
										    Leave
									    </Link>
										</Button>
									</Tooltip>
								</Typography>
								<Typography variant="h6" className={classes.title}>
									<Tooltip title="Logout" arrow>
										<Button onClick={logoutHandler} style={{ color: 'white'}}>
										  Logout
										</Button>
									</Tooltip>
								</Typography>
			        </Toolbar>
      			</AppBar>
			    </div>
					<div>
						<Switch>
							<Route
								path='/dashboard'
								exact
								render={() => (
									<Dashboard id={employeeId} />
								)}
							/>
							<Route
								path='/notification'
								exact
								component={Notification}
							/>
							<Route
								path='/leave'
								exact
								component={Leave}
							/>
							<Redirect to="/dashboard" />
						</Switch>
					</div>
					<Footer />
				</Router>
			}
		</div>
	)
}

export default EmployeeNavbar;