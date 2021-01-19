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
      const response = await fetch('http://localhost:8000/leave', {
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
    <Container>
      <List>
        {dates.map(date => (
          <ListItemText key={date} primary={ date}/>
        ))}
      </List>
      <TextField
          value={reason}
          onChange={e => setReason(e.target.value)}
          multiline
          rows={4}
          variant="outlined"
          id="standard-basic"
          label="Reason" 
      />
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
    </Container>
  )
}

export default Leave;