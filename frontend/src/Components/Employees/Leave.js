import React, { useState } from 'react'

function Leave() {

  const [description, setDescription] = useState("");

  const onSubmit = () => {
    fetch('http://localhost:8000/leave', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description: description
      })
    })
    .then(resData => {
      setDescription("")
      alert("done");
    })
    .catch(err => console.log(err));
  }

  return (
    <div>
      <textarea
        type="text"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button
        type="submit"
        onClick={onSubmit}
       >Submit</button>
    </div>
  )
}

export default Leave;