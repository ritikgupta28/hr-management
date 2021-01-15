import React, { useState, useEffect } from 'react';
import TeamDescription from './TeamDescription';
import { useStateValue } from "../../StateProvider";

function TeamList() {

  const [{ token }, dispatch] = useStateValue();
  const [teams, setTeams] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/teamList', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
      })
      .then(res => {
        setStatus(res.status)
        return res.json();
      })
      .then(resData => {
        if (status === 500) {
          throw new Error(resData.message);
        }
        setTeams(resData["teams"]);
      })
      .catch(err => {
        alert(err);
      });
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