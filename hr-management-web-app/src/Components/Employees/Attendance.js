import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import './Attendance.css';
import { useStateValue } from "../../StateProvider";
import { CircularProgress, Container, Typography } from '@material-ui/core';

function Attendance({ id }) {

  const [{ token }, dispatch] = useStateValue();
  const [date, onDateChange] = useState(new Date());
  const [absents, setAbsent] = useState([]);
  const [holidays, setHoliday] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://hr-management-web-app-api.herokuapp.com/attendance/' + id, {
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
      setLoading(false);
      } catch (err) {
        setLoading(false);
        alert(err)
      };
    }
    if (id !== "null") {
      fetchData();
    }
  }, [])

  return (
    <Container>
      {loading
        ?
        <CircularProgress />
        :
        <div>
          <Typography>Attendance</Typography>
          <Typography style={{ display: 'flex' }}>
           <div style={{ padding: '8px', margin: '5px', backgroundColor: 'green' }} />Holiday
           <div style={{ padding: '8px', margin: '5px', backgroundColor: 'red' }} />Leave
          </Typography>
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
      }
    </Container>
  )
}

export default Attendance;