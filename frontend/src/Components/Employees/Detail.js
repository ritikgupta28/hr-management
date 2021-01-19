import React, { useEffect, useState } from 'react'
import moment from "moment"
import {
  CardActions,
  CardContent,
  Typography
} from '@material-ui/core';


function Detail({ notification }) {
  return (
    <div>
      <CardContent>
        <Typography>
          <p>{moment(notification.createdAt).format("DD-MM-YYYY")},
          {moment(notification.createdAt).format("HH:mm")}</p>
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
      <CardActions>
        {notification.reply === "unseen"
          ?
          <Typography>Pending</Typography>
          :
          (notification.reply === "accept"
            ?
            <Typography>Accepted</Typography>
            :
            <Typography>Rejected</Typography>
          )
        }
      </CardActions>
      </div>
  )
}

export default Detail;