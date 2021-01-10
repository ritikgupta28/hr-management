import React, { useState, useEffect } from 'react'

function TeamList() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/teamList', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
      })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        setTeams(resData["teams"]);
      })
      .catch(err => console.log(err));
  }, [])

  return (
    <div>
      <h1>Team</h1>
      <div>
        {teams?.map(team => (
          <div>
          	<p key={team._id}>{team.name}</p>
          	<div>
          		{team.members?.map(member => (
          			<p key={member._id}>{member.employeeId.email}</p>
          		))}
          	</div>
          	<p key={team._id}>{team.description}</p>
          	<br/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TeamList;