import React from 'react'
import { HashRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import Login from "../Auth/Login"
import SignUp from "../Auth/SignUp"
import Policies from "./Policies"
import FAQ from "./FAQ"
import LandingPage from "./LandingPage"
import Footer from "../Footer"
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

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
					<Button>
						<Link to='/policies' style={{ textDecoration: 'none', color: 'white' }}>Policies</Link>
						</Button>
						<Button>
						<Link to='/faq' style={{ textDecoration: 'none', color: 'white' }}>F.A.Q</Link>
						</Button>
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
						component={LandingPage}
					/>
					<Route
						path='/policies'
						exact
						component={Policies}
					/>
					<Route
						path='/faq'
						exact
						component={FAQ}
            />
					<Route
						path='/login'
						exact
						component={Login}
            />
            <Route
						path='/signup'
						exact
						component={SignUp}
					/>
					<Redirect to="/" />
				</Switch>
			</div>
			<Footer />
		</Router>
  )
}

export default Navbar;