import React, { useEffect, useState } from 'react';
import openSocket from "socket.io-client";
import moment from "moment"

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
        console.log(resData);
        setNotification(resData["notifications"]);
      })
      .catch(err => console.log(err));
       
      const socket = openSocket('http://localhost:8000');
      socket.on('leave', data => {
        if (data.action === 'leave') {
          setNotification([ ...notifications, data])
        }
      })
  }, [notifications])

  return (
    <div>
      <h1>Notifications</h1>
      <div>
        {notifications?.map(notification => (
          <div key={notification._id}>
            <p>{moment(notification.updatedAt).format("DD-MM-YYYY")}</p>
            <p>{moment(notification.updatedAt).format("HH:mm")}</p>
            <p>{notification.employeeId.name}</p>
            <p>{notification.reason}</p>
            <br/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Notification;