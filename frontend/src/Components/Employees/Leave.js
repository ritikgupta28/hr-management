import React, { useState } from 'react'
import moment from "moment"
import { useStateValue } from "../../StateProvider";
import { Container } from '@material-ui/core';

function Leave() {
  
  const [{ token }, dispatch] = useStateValue();
  const [dates, setDates] = useState([]);
  const [reason, setReason] = useState("");

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
      {dates.map(date => (
        <p>{date}</p>
      ))}
      <textarea
        type="text"
        value={reason}
        onChange={e => setReason(e.target.value)}
      />
      <input 
        type="date"
        value={dates}
        onChange={e => setDates([...dates, moment(e.target.value).format("DD-MM-YYYY")])}
      />
      <button
        type="submit"
        onClick={onSubmit}
      >
        Submit
      </button>
    </Container>
  )
}

export default Leave;