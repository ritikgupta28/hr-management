import React, { useEffect, useState } from 'react';
// import openSocket from "socket.io-client";
import Detail from './Detail';

function Notification() {

  const [notifications, setNotification] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/notification', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
      })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        setNotification(resData["notifications"]);
      })
      .catch(err => console.log(err));
       
      // const socket = openSocket('http://localhost:8000');
      // socket.on('leave', data => {
      //   if (data.action === 'leave') {
      //     setNotification([ ...notifications, data])
      //   }
      // })
  }, [])

  return (
    <div>
      <h1>Notifications</h1>
        {notifications?.map(notification => (
          <Detail key={notification._id} notification={notification} />
        ))}
    </div>
  )
}

export default Notification;