import React, { useState } from 'react'
import moment from "moment"
import { useStateValue } from "../../StateProvider"

function Holiday() {
  
  const [{ id, token }, dispatch] = useStateValue();
  const [dates, setDates] = useState([]);

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
    .then(resData => {
      alert("Done!");
    })
    .catch(err => console.log(err));
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