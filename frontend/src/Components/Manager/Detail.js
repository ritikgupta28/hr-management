import React, { useEffect, useState } from 'react'
import moment from "moment"
import { actionType } from "../../reducer"
import { useStateValue } from "../../StateProvider";

function Detail({ notification }) {
  const [{ token, status }, dispatch] = useStateValue();
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
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: e.target.value
      })
    })
    .then(res => {
      dispatch({
        type: actionType.SET_STATUS,
        status: res.status
      })
      return res.json();
    })
    .then(resData => {
      if (status === 500) {
        throw new Error(resData.message);
      }
      setReply("accept")
    })
      .catch(err => {
        alert(err);
    });
  }

  const onReject = (e) => {
    fetch('http://localhost:8000/rejectReply', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: e.target.value
      })
    })
    .then(res => {
      dispatch({
        type: actionType.SET_STATUS,
        status: res.status
      })
      return res.json();
    })
    .then(resData => {
      if (status === 500) {
        throw new Error(resData.message);
      }
        setReply("reject")
    })
      .catch(err => {
        alert(err);
    });
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
