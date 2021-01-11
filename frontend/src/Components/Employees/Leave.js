import React, { useState } from 'react'

function Leave({ id }) {
  const [reason, setReason] = useState("");

  const onSubmit = () => {
    fetch('http://localhost:8000/leave', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
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
      <textarea
        type="text"
        value={reason}
        onChange={e => setReason(e.target.value)}
      />
      <button type="submit" onClick={onSubmit} >Submit</button>
    </div>
  )
}

export default Leave;