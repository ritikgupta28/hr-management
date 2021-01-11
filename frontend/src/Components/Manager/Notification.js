import React, { useEffect, useState } from 'react';
import openSocket from "socket.io-client";

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
  }, [])

  return (
    <div>
      <h1>Notification</h1>
      <div>
        {notifications?.map(notification => (
          <div key={notification._id}>
            <p>{notification.employeeId.name}</p>
            <p>{notification.reason}</p>
            <br/>
          </div>
        ))}
      </div>
    </div>
  )

  
  // useEffect(() => {
  //   const socket = openSocket('http://localhost:8000');
  //   console.log(socket);
  //   // socket.on('description', data => {
  //   //   if (data.action === 'notification') {
  //   //     setNotification([...notification, data.description])
  //   //   }
  //   // })
  // }, [])

  // return (
  //   <div>
  //     {notification?.map(noti => {
  //       <p>noti</p>
  //     })}
  //   </div>
  // );
}

export default Notification;