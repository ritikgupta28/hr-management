import React, { useState } from 'react'
import moment from "moment"
import { useStateValue } from "../../StateProvider"

function Holiday() {
  
  const [{ token }, dispatch] = useStateValue();
  const [dates, setDates] = useState([]);
  const [status, setStatus] = useState(null);

  const onSubmit = () => {
    fetch('http://localhost:8000/holiday', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dates: dates
      })
    })
    .then(res => {
      setStatus(res.status)
      return res.json();
    })
    .then(resData => {
      if (status === 500) {
        throw new Error(resData.message);
      }
      alert("Done!");
    })
      .catch(err => {
        alert(err);
    });
  }

  return (
    <div>
      {dates.map(date => (
        <p>{date}</p>
      ))}
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

export default Holiday;