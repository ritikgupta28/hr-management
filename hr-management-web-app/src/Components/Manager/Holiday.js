import React, { useState, useEffect } from 'react'
import moment from "moment"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useStateValue } from "../../StateProvider"
import Footer from "../Footer"
import "./Manager.css"
import {
  Container,
  Button,
  TextField,
  CircularProgress,
  Typography
} from '@material-ui/core';

function Holiday() {
  
  const [{ token }, dispatch] = useStateValue();
  const [date1, onDateChange] = useState(new Date());
  const [dates, setDates] = useState([]);
  const [date, setDate] = useState(new Date());
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://hr-management-web-app-api.herokuapp.com/holiday', {
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
        setHolidays(resData["holidays"]);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        alert(err);
      }
    }
    fetchData();
  }, [holidays])

  const onSubmit = async (e) => {
    try {
      const response = await fetch('https://hr-management-web-app-api.herokuapp.com/holiday', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          dates: dates
        })
      })
      const status = await response.status;
      const resData = await response.json();
      if (status === 500) {
        throw new Error(resData.message);
      }
      setDates([]);
      setDate("");
      alert("Done!");
    } catch(err) {
      alert(err)
    }
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
      <div>
        {dates.map(date => (
          <Typography key={date}>
            {date}
          </Typography>
        ))}
      </div>
      <div className="text">
          <TextField
          value={date}
          onChange={e => {
            setDate(e.target.value);
            if (dates.indexOf(moment(e.target.value).format("DD-MM-YYYY")) === -1) {
              setDates([...dates, moment(e.target.value).format("DD-MM-YYYY")])
            }
          }}
          label="Holiday"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />
        <br />
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </div>
      <div className="cal">
        {loading
          ?
          <CircularProgress />
          :
          <Calendar
            onChange={onDateChange}
            value={date1}
            tileClassName={({ date, view }) => {
              if(holidays?.find(x => x === moment(date).format("DD-MM-YYYY"))) {
                return 'holidays'
              }
            }}
          />  
        }
      </div>
      </Container>
      <Footer />
      </div>
  )
}

export default Holiday;