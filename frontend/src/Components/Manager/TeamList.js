import React, { useState, useEffect } from 'react';
import TeamDescription from './TeamDescription';
import { useStateValue } from "../../StateProvider";

function TeamList() {

  const [{ token }, dispatch] = useStateValue();
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8000/teamList', {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        })
        const status = await response.status;
        const resData = await response.json();
        if (status === 500) {
          throw new Error(resData.message);
        }
        setTeams(resData["teams"]);
      } catch(err) {
        alert(err)
      }
    }
    fetchData();
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