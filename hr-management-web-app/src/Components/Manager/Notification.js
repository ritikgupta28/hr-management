import React, { useEffect, useState } from 'react';
import Detail from './Detail';
import { useStateValue } from "../../StateProvider"
import { makeStyles } from '@material-ui/core/styles';
import { Card, CircularProgress, Container } from '@material-ui/core';

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
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://hr-management-web-app-api.herokuapp.com/notification', {
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
    <Container>
      {loading
        ?
        <CircularProgress />
        :
        <div>
          {notifications?.map(notification => (
            <Card key={notification._id} className={classes.root} variant="outlined">
              <Detail notification={notification} />
            </Card>
          ))}
        </div>
      }
    </Container>
  )
}

export default Notification;