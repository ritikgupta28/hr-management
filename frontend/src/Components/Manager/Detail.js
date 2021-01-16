import React, { useEffect, useState } from 'react'
import moment from "moment"
import { useStateValue } from "../../StateProvider";

function Detail({ notification }) {

  const [{ token }, dispatch] = useStateValue();
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

  const onAccept = async (e) => {
    try {
      const response = await fetch('http://localhost:8000/acceptReply', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: e.target.value
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
          id: e.target.value
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

export default Detail;