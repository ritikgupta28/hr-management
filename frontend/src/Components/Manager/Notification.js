import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import openSocket from "socket.io-client";
import "./Notification.css";

function Notification() {
  const [date, onDateChange] = useState(new Date());
  const [absents, setAbsent] = useState([]);
  const [holidays, setHoliday] = useState([]);
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/attendance', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
      })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        setAbsent(resData["absents"]);
        setHoliday(resData["holidays"]);
      })
      .catch(err => console.log(err));
  }, [])
  
  useEffect(() => {
    const socket = openSocket('http://localhost:8000');
    console.log(socket);
    // socket.on('description', data => {
    //   if (data.action === 'notification') {
    //     setNotification([...notification, data.description])
    //   }
    // })
  }, [])

  return (
    <div>
      {notification?.map(noti => {
        <p>noti</p>
      })}
      {/* <Calendar
        onChange={onDateChange}
        value={date}
        tileClassName={({ date, view }) => {
          if(absents.find(x => x === moment(date).format("DD-MM-YYYY"))) {
            return 'highlight'
          }
          if(holidays.find(x => x === moment(date).format("DD-MM-YYYY"))) {
            return 'highlight1'
          }
        }
        }
      /> */}
    </div>
  );
}

export default Notification;