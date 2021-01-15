import React from 'react'
import { HashRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import Login from "../Auth/Login"
import SignUp from "../Auth/SignUp"
import LandingPage from "./LandingPage"

function Navbar() {

  return (
    <Router>
      <div className="navbar">
			<Link to='/'><h1>HR-MANAGAR</h1></Link>
				<button>
          <Link to='/login'>Login</Link>
				</button>
        <button>
					<Link to='/signup'>SignUp</Link>
				</button>
			</div>
			<div className="navbar_pages">
				<Switch>
				<Route
						path='/'
						exact
						render={props => (
							<LandingPage />
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