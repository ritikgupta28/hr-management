import React, { useState, useEffect } from 'react';
import TeamDescription from './TeamDescription';
import Footer from "../Footer"
import { useStateValue } from "../../StateProvider";
import { CircularProgress, Container, List, Typography } from "@material-ui/core";

function TeamList() {

  const [{ token }, dispatch] = useStateValue();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://hr-management-web-app-api.herokuapp.com/teamList', {
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
        setLoading(false);
      } catch (err) {
        setLoading(false);
        alert(err)
      }
    }
    fetchData();
  }, [])

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Typography variant="h4">All Teams</Typography>
      {loading
        ?
        <CircularProgress />
        :
        <List>
          {teams?.map(team => (
            <TeamDescription key={team._id} team={team} />
          ))}
        </List>
      }
    </Container>
    <Footer />
    </div>
  )
}

export default TeamList;