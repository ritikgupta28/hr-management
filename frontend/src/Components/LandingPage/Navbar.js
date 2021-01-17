import React from 'react'
import { HashRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import Login from "../Auth/Login"
import SignUp from "../Auth/SignUp"
import Policies from "./Policies"
import FAQ from "./FAQ"
import LandingPage from "./LandingPage"
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

function Navbar() {

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
            <Link to='/policies' style={{ textDecoration: 'none', color: 'white' }}>Policies</Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
					  <Link to='/faq' style={{ textDecoration: 'none', color: 'white' }}>F.A.Q</Link>
          </Typography>
						<Button>
							<Link to='/login' style={{ textDecoration: 'none', color: 'white' }}>Login</Link>
						</Button>
						<Button>
							<Link to='/signup' style={{ textDecoration: 'none', color: 'white' }}>SignUp</Link>
						</Button>
        </Toolbar>
      </AppBar>
    </div>
			<div>
				<Switch>
				<Route
						path='/'
						exact
						render={props => (
							<LandingPage />
						)}
					/>
					<Route
						path='/policies'
						exact
						render={props => (
							<Policies />
						)}
					/>
					<Route
						path='/faq'
						exact
						render={props => (
							<FAQ />
						)}
            />
					<Route
						path='/login'
						exact
						render={props => (
							<Login />
						)}
            />
            <Route
						path='/signup'
						exact
						render={props => (
							<SignUp />
						)}
					/>
					<Redirect to="/" />
				</Switch>
			</div>
		</Router>
  )
}

export default Navbar;