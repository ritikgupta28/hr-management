import React, { useEffect, useState } from 'react';
import Detail from './Detail';
import { useStateValue } from "../../StateProvider"
import { makeStyles } from '@material-ui/core/styles';
import { Card, CircularProgress, Container, Typography } from '@material-ui/core';

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

  const [{ token, employeeId }, dispatch] = useStateValue();
  const [notifications, setNotification] = useState([]);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://hr-management-web-app-api.herokuapp.com/notification/' + employeeId, {
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
        setNotification(resData["notifications"]);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        alert(err)
      }
    }
    fetchData();
  }, [])

  return (
    <Container style={{marginTop: '20px', minHeight: '480px'}}>
      {loading
        ?
        <CircularProgress />
        :
        <Container>
          {notifications.length === 0
            ?
            <Typography variant="h4">No Notifications</Typography>
            :
            notifications?.map(notification => (
              <Card key={notification._id} className={classes.root} variant="outlined">
                <Detail notification={notification} />
              </Card>
            ))
          }
        </Container>
      }
    </Container>
  )
}

export default Notification;