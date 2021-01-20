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
      const response = await fetch('http://localhost:8000/acceptReply', {
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
        const response = await fetch('http://localhost:8000/rejectReply', {
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
      display: 'flex', justifyContent: 'space-between', margin: '0px 20px'}}>
      <CardContent>
       <Typography>
         <p>{notification.employeeId.name}</p>
       </Typography>
        <Typography color="textSecondary" gutterBottom>
          {notification.dates.map(date => (
            <p key={date}>{date}</p>
          ))}
        </Typography>
        <Typography variant="body2" component="p">
          {notification.reason}
        </Typography>
      </CardContent>
      <CardActions style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography>
        <p>{moment(notification.createdAt).format("DD-MM-YYYY")},
        {moment(notification.createdAt).format("HH:mm")}</p>
      </Typography>
      {renderButtons()}
      </CardActions>
    </div>
  )
}

export default Detail;