import React, { useState } from 'react'
import moment from "moment"
import { useStateValue } from "../../StateProvider"

function Holiday() {
  
  const [{ token }, dispatch] = useStateValue();
  const [dates, setDates] = useState([]);

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
      alert("Done!");
    } catch(err) {
      alert(err)
    }
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