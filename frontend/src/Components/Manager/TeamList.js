import React, { useState, useEffect } from 'react'
import TeamDescription from './TeamDescription';

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
          <TeamDescription key={team._id} team={team} />
        ))}
      </div>
    </div>
  )
}

export default TeamList;