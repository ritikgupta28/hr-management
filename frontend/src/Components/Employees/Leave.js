import React, { useState } from 'react'
import moment from "moment"

function Leave({ id }) {
  const [dates, setDates] = useState([]);
  const [reason, setReason] = useState("");

  const onSubmit = () => {
    fetch('http://localhost:8000/leave', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dates: dates,
        reason: reason,
        id: id
      })
    })
    .then(resData => {
      setReason("")
      alert("Done!");
    })
    .catch(err => console.log(err));
  }

  return (
    <div>
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
    </div>
  )
}

export default Leave;