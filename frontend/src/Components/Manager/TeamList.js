import React, { useState, useEffect } from 'react';
import TeamDescription from './TeamDescription';
import { useStateValue } from "../../StateProvider";
import Container from "@material-ui/core/Container"
import List from "@material-ui/core/List"

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
    <Container style={{padding: '0px 100px'}}>
      <List>
        {teams?.map(team => (
          <TeamDescription key={team._id} team={team} />
        ))}
      </List>
    </Container>
  )
}

export default TeamList;