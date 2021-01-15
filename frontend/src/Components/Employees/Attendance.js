import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import './Attendance.css';
import { actionType } from "../../reducer";
import { useStateValue } from "../../StateProvider";

function Attendance({ id }) {

  const [{ token, status }, dispatch] = useStateValue();
  const [date, onDateChange] = useState(new Date());
  const [absents, setAbsent] = useState([]);
  const [holidays, setHoliday] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/attendance/' + id, {
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
        setAbsent(resData["absents"]);
        setHoliday(resData["holidays"]);
      })
      .catch(err => {
        alert(err)
      });
  }, [])

  return (
    <div>
      <Calendar
        onChange={onDateChange}
        value={date}
        tileClassName={({ date, view }) => {
          if(absents?.find(x => x === moment(date).format("DD-MM-YYYY"))) {
            return 'highlight'
          }
          if(holidays?.find(x => x === moment(date).format("DD-MM-YYYY"))) {
            return 'highlight1'
          }
        }}
      />
    </div>
  )
}

export default Attendance;