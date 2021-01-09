import React from 'react'
import { Route, Router } from 'react-router-dom'
import Dashboard from "./Dashboard"

function Navbar() {
  return (
    <div>
      <Router>
        <Route path='/dashboard'
          exact render={props => (
					<Dashboard />
				)} 
        />
      </Router>
    </div>
  )
}

export default Navbar;
