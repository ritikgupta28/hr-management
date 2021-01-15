import React, { useEffect, useState } from 'react';
import Detail from './Detail';
import { actionType } from "../../reducer"
import { useStateValue } from "../../StateProvider"

function Notification() {
  const [{ token, status }, dispatch] = useStateValue();
  const [notifications, setNotification] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/notification', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
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
        setNotification(resData["notifications"]);
      })
      .catch(err => {
        alert(err);
      });
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