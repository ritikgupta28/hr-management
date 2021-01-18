import React, { useEffect, useState } from 'react';
import Detail from './Detail';
import { useStateValue } from "../../StateProvider"
import { makeStyles } from '@material-ui/core/styles';
import { Card, Container } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


function Notification() {

  const [{ token }, dispatch] = useStateValue();
  const [notifications, setNotification] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8000/notification', {
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
        console.log(resData);
        setNotification(resData["notifications"]);
      } catch(err) {
        alert(err)
      }
    }
    fetchData();
  }, [])

  return (
    <Container>
      {notifications?.map(notification => (
        <Card key={notification._id} className={classes.root} variant="outlined">
          <Detail notification={notification} />
        </Card>
       ))}
    </Container>
  )
}

export default Notification;