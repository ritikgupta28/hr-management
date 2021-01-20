import React, { useState, useEffect } from 'react'
import moment from "moment"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useStateValue } from "../../StateProvider"
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  CircularProgress
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function Holiday() {
  
  const [{ token }, dispatch] = useStateValue();
  const [date1, onDateChange] = useState(new Date());
  const [dates, setDates] = useState([]);
  const [date, setDate] = useState(new Date());
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8000/holiday', {
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
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/holiday', {
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
    <Container className={classes.container}>
      <div>
        <List>
          {dates.map(date => (
            <ListItem key={date}>
              <ListItemText primary={date} />
            </ListItem>
        ))}
        </List>
      </div>
      <div>
        <TextField
          value={date}
          onChange={e => {
            setDate(e.target.value);
            if (dates.indexOf(moment(e.target.value).format("DD-MM-YYYY")) === -1) {
              setDates([...dates, moment(e.target.value).format("DD-MM-YYYY")])
            }
          }}
          id="date"
          label="Holiday"
          type="date"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
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
      <div>
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
  )
}

export default Holiday;