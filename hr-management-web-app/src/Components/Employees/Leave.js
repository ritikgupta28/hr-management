import React, { useState } from 'react'
import moment from "moment"
import { useStateValue } from "../../StateProvider";
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Container,
  List,
  ListItemText,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function Leave() {
  
  const [{ token }, dispatch] = useStateValue();
  const [dates, setDates] = useState([]);
  const [date, setDate] = useState(new Date());
  const [reason, setReason] = useState("");
  const classes = useStyles();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://hr-management-web-app-api.herokuapp.com/leave', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dates: dates,
        reason: reason
      })
      })
      const status = await response.status;
      const resData = await response.json();
      if (status === 500) {
        throw new Error(resData.message);
      }
      setReason("");
      setDates([]);
      alert("Done!");
    } catch(err) {
      alert(err);
    };
  }

  return (
    <Container style={{
      display: 'flex',
      marginTop: '40px',
      minHeight: '480px',
      justifyContent: 'space-evenly'
    }}>
      <div>
        <div>
        {dates.map(date => (
          <p key={date}>{date}</p>
        ))}
        </div>
        <TextField
          style={{ margin: '20px'}}
          value={date}
          onChange={e => {
            setDate(e.target.value);
            let day = new Date(e.target.value);
            if(day.getDay() !== 6 && day.getDay() !== 0 && dates.indexOf(moment(e.target.value).format("DD-MM-YYYY")) === -1) {
              setDates([...dates, moment(e.target.value).format("DD-MM-YYYY")])
            }
          }}
          label="Add Date"
          type="date"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
          </div>
      <div style={{ margin: '20px'}}>
        <TextField
            value={reason}
            onChange={e => setReason(e.target.value)}
            multiline
            rows={4}
            variant="outlined"
            label="Reason" 
        />
        <br />
        <Button
          style={{ margin: '20px'}}
          variant="outlined"
          color="primary"
          type="submit"
          onClick={onSubmit}
        >
            Submit
        </Button>
      </div>
    </Container>
  )
}

export default Leave;