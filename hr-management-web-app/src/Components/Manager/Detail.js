import React, { useEffect, useState } from 'react'
import moment from "moment"
import { useStateValue } from "../../StateProvider";
import {
  CardActions,
  CardContent,
  Button,
  Typography
} from '@material-ui/core';


function Detail({ notification }) {

  const [{ token }, dispatch] = useStateValue();
  const [reply, setReply] = useState(notification.reply);

  const renderButtons = () => {
    return (
      reply === "unseen"
        ?
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={onAccept}
          >
            Accept
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={onReject}
          >
            Reject
          </Button>
        </div>
        :
        (reply === "accept"
          ?
          <Typography>Accepted</Typography>
          :
          <Typography>Rejected</Typography>
        )
    )
  }
 
  useEffect(() => {
    renderButtons();
  }, [reply])

  const onAccept = async (e) => {
    try {
      const response = await fetch('https://hr-management-web-app-api.herokuapp.com/acceptReply', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: notification._id
        })
      })
      const status = await response.status;
      const resData = await response.json();
      if (status === 500) {
        throw new Error(resData.message);
      }
      setReply("accept")
    } catch (err) {
      alert(err);
    }
}
  
    const onReject = async (e) => {
      try { 
        const response = await fetch('https://hr-management-web-app-api.herokuapp.com/rejectReply', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: notification._id
        })
        })
        const status = await response.status;
        const resData = await response.json();
        if (status === 500) {
          throw new Error(resData.message);
        }
        setReply("reject")
      } catch(err) {
        alert(err);
      }
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between'}}>
      <CardContent>
       <Typography>
         {notification.employeeId.name}
       </Typography>
          {notification.dates.map(date => (
            <Typography component="p" color="textSecondary" key={date}>
              {date}
            </Typography>
          ))}
        <Typography variant="body2" component="p">
          {notification.reason}
        </Typography>
      </CardContent>
      <CardActions style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
      <Typography>
        {moment(notification.createdAt).format("DD-MM-YYYY")},
        {moment(notification.createdAt).format("HH:mm")}
      </Typography>
      {renderButtons()}
      </CardActions>
    </div>
  )
}

export default Detail;