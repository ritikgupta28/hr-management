import React, { useState } from 'react'
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom'
import TeamList from "./TeamList"
import AddEmployee from "./AddEmployee"
import EmployeeList from "./EmployeeList"
import AddTeam from "./AddTeam"
import Notification from "./Notification"
import Holiday from "./Holiday"
import Dashboard from "../Employees/Dashboard"
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  Button,
  ListItemText,
  Tooltip
} from "@material-ui/core";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
	},
	title: {
    flexGrow:  0.02
	},
	mainTitle: {
    flexGrow:  1
  },
  link: {
    textDecoration: 'none',
    color: 'black'
  }
}));

function ManagerNavbar({ logoutHandler }) {
	
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


	const drawer = (
		<div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
      <Link to='/employee' className={classes.link}>
				<ListItem button>
					  <ListItemText primary="Employees" />
					</ListItem>
        </Link>
        <Link to='/add_employee' className={classes.link}>
				<ListItem button>
						<ListItemText primary="Add Employee" />
				</ListItem>
				</Link>
			<Link to='/teams' className={classes.link} >
				<ListItem button>
					  <ListItemText primary="Teams" />
					</ListItem>
				</Link>
				<Link to='/add_team' className={classes.link}>
				<ListItem button>
					  <ListItemText primary="Create Team" />
				</ListItem>
				</Link>
				<Link to='/holiday' className={classes.link}>
				<ListItem button>
						<ListItemText primary="Holidays" />
					</ListItem>
				</Link>
      </List>
    </div>
  );

	return (
		<Router>
			<div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
            <Typography variant="h5" noWrap className={classes.mainTitle}>
              <Tooltip title="Dashboard" arrow>
						  	<Link to='/teams' style={{ textDecoration: 'none', color: 'white' }}>
                  HR-MANAGER
							  </Link>
              </Tooltip>
						</Typography>
						<Typography variant="h6" noWrap className={classes.title}>
							<Link to='/notification' style={{ textDecoration: 'none', color: 'white' }}>
                <Tooltip title="Notifications" arrow>
                  <NotificationsIcon />
                </Tooltip>
				      </Link>
            </Typography>
            <Typography variant="h6" noWrap className={classes.title}>
                <Tooltip title="Logout" arrow>
                <Button style={{ color: 'white' }} onClick={logoutHandler}>
						    	Logout
					    	</Button>
                </Tooltip>
						</Typography>
        </Toolbar>
      </AppBar>
			<Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
          {drawer}
        </Drawer>
		<main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
				<Switch>
					<Route
						path='/teams'
						exact
						component={TeamList} 
					/>
					<Route
						path='/add_team'
						exact
						component={AddTeam} 
					/>
					<Route
						path='/employee'
						exact
						component={EmployeeList} 
					/>
					<Route
						path='/add_employee'
						exact
						component={AddEmployee} 
					/>
					<Route
						path='/notification'
						exact
						component={Notification} 
					/>
					<Route
						path='/holiday'
						exact
						component={Holiday} 
					/>
					<Route
						path='/employee/:id'
						render={props => (
							<Dashboard
								id={props.match.params.id}
							/>
						)}
            />
					<Redirect to="/employee" />
					</Switch>
        </main>
      </div>
		</Router>
	)
}

export default ManagerNavbar;