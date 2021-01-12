import React, { useEffect, useState } from 'react'
import moment from "moment"

function Detail({ notification }) {

  const [reply, setReply] = useState(notification.reply);

  const renderButtons = () => {
    return (
        reply === "unseen"
          ? 
          <div>
            <button value={notification._id} onClick={onAccept}>Accept</button>
            <button value={notification._id} onClick={onReject}>Reject</button>
          </div>
          :
          (reply === "accept"
            ? 
            <p>Accepted</p>
            :
            <p>Rejected</p>
          )
    )
  }
 
  useEffect(() => {
    renderButtons();
  }, [reply])

  const onAccept = (e) => {
    fetch('http://localhost:8000/acceptReply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: e.target.value
      })
    })
      .then(resData => {
      setReply("accept")
    })
    .catch(err => console.log(err));
  }

  const onReject = (e) => {
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
        setReply("reject")
    })
    .catch(err => console.log(err));
  }

  return (
    <div>
      <p>{moment(notification.createdAt).format("DD-MM-YYYY")}</p>
      <p>{moment(notification.createdAt).format("HH:mm")}</p>
      <p>{notification.employeeId.name}</p>
      {notification.dates.map(date => (
        <p key={date}>{date}</p>
      ))}
      <p>{notification.reason}</p>
      {renderButtons()}
      <br/>
    </div>
  )
}

export default Detail
