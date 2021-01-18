import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import './Attendance.css';
import { useStateValue } from "../../StateProvider";

function Attendance({ id }) {

  const [{ token }, dispatch] = useStateValue();
  const [date, onDateChange] = useState(new Date());
  const [absents, setAbsent] = useState([]);
  const [holidays, setHoliday] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8000/attendance/' + id, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      })
      const status = await response.status;
      const resData = await response.json();
      if (status === 500) {
        throw new Error(resData.message);
      }
      setAbsent(resData["absents"]);
      setHoliday(resData["holidays"]);
      } catch(err) {
        alert(err)
      };
    }
    if (id !== "null") {
      fetchData();
    }
  }, [])

  return (
    <div>
      <Calendar
        onChange={onDateChange}
        value={date}
        tileClassName={({ date, view }) => {
          if(absents?.find(x => x === moment(date).format("DD-MM-YYYY"))) {
            return 'absents'
          }
          if(holidays?.find(x => x === moment(date).format("DD-MM-YYYY"))) {
            return 'holidays'
          }
        }}
      />
    </div>
  )
}

export default Attendance;