import React from 'react';
import { Link } from 'react-router-dom';

function Card({ employee }) {
  return (
    <div>
    	<Link to={`/employee/${employee._id}`}>
				<p>{employee.email}</p>
			</Link>
    </div>
  )
}

export default Card;