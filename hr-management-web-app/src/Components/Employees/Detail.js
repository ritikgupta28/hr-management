import React, { useEffect, useState } from 'react'
import moment from "moment"
import {
  CardActions,
  CardContent,
  Typography
} from '@material-ui/core';


function Detail({ notification }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', margin: '0px 20px'}}>
      <CardContent>
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