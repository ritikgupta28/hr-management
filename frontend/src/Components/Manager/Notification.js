import React, { useEffect, useState } from 'react';
// import openSocket from "socket.io-client";
import moment from "moment";

function Notification() {
  const [notifications, setNotification] = useState([]);
  // const [reply, setReply] = useState('');

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

  const onAccept = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/acceptReply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date: '06-01-2021',
        id: e.target.value
      })
    })
    .then(resData => {
      // setReply('accept');
    })
    .catch(err => console.log(err));
  }

  const onReject = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/rejectReply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: e.target.value
      })
    })
    .then(resData => {
      // setReply('reject');
    })
    .catch(err => console.log(err));
  }

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
            {
              notification.reply === "unseen" ? 
                <div>
                  <button value={notification._id} onClick={onAccept}>Accept</button>
                  <button value={notification._id} onClick={onReject}>Reject</button>
                </div>
              : (notification.reply === "accept" ? 
                <div>
                  <p>Accepted</p>
                </div>
              :
                <div>
                  <p>Rejected</p>
                </div>)
            }
            <br/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Notification;