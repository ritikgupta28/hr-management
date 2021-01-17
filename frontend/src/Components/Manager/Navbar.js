import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom'
import TeamList from "./TeamList"
import AddEmployee from "./AddEmployee"
import EmployeeList from "./EmployeeList"
import AddTeam from "./AddTeam"
import Notification from "./Notification"
import Holiday from "./Holiday"
import Dashboard from "../Employees/Dashboard"
import NotificationsIcon from '@material-ui/icons/Notifications';
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

function ManagerNavbar({ logoutHandler }) {

	const classes = useStyles();

	return (
		<Router>
			<div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.mainTitle}>
            <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>HR-MANAGER</Link>
          </Typography>
          <Typography variant="h7" className={classes.title}>
            <Link to='/teams' style={{ textDecoration: 'none', color: 'white' }}>Teams</Link>
          </Typography>
          <Typography variant="h7" className={classes.title}>
					  <Link to='/add_team' style={{ textDecoration: 'none', color: 'white' }}>Add Team</Link>
					</Typography>
          <Typography variant="h7" className={classes.title}>
            <Link to='/employee' style={{ textDecoration: 'none', color: 'white' }}>Employee</Link>
          </Typography>
          <Typography variant="h7" className={classes.title}>
					  <Link to='/add_employee' style={{ textDecoration: 'none', color: 'white' }}>Add Employee</Link>
          </Typography>
					<Typography variant="h7" className={classes.title}>
					  <Link to='/holiday' style={{ textDecoration: 'none', color: 'white' }}>Holiday</Link>
          </Typography>
					<Typography variant="h7" className={classes.title}>
					  <Link to='/notification' style={{ textDecoration: 'none', color: 'white' }}>
						<NotificationsIcon /></Link>
          </Typography>
					<Button onClick={logoutHandler} style={{ color: 'white' }}>
						Logout
					</Button>
        </Toolbar>
				</AppBar>
				</div>
			<div>
				<Switch>
					<Route
						path='/teams'
						exact
						render={props => (
							<TeamList />
						)} 
					/>
					<Route
						path='/add_team'
						exact
						render={props => (
							<AddTeam />
						)} 
					/>
					<Route
						path='/employee'
						exact
						render={props => (
							<EmployeeList />
						)} 
					/>
					<Route
						path='/add_employee'
						exact
						render={props => (
							<AddEmployee />
						)} 
					/>
					<Route
						path='/notification'
						exact
						render={props => (
							<Notification />
						)} 
					/>
					<Route
						path='/holiday'
						exact
						render={props => (
							<Holiday />
						)} 
					/>
					<Route
						path='/employee/:id'
						render={props => (
							<Dashboard
								id={props.match.params.id}
							/>
						)}
					/>
					<Redirect to="/teams" />
				</Switch>
			</div>
		</Router>
	)
}

export default ManagerNavbar;