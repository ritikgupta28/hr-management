import React, { useEffect, useState } from "react";
import moment from "moment";
import { useStateValue } from "../../StateProvider";

function Salary({ id }) {

  const [{ token }, dispatch] = useStateValue();
  const [month, setMonth] = useState("");
  const [salary, setSalary] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [status, setStatus] = useState(null);
  
  useEffect(() => {
    fetch('http://localhost:8000/salary', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        month: moment(month).format("MM-YYYY"),
        id: id
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
        setExpectedSalary(resData["expectedSalary"]?.toPrecision(4));
        setSalary(resData["salary"]?.toPrecision(4));
      })
      .catch(err => {
        alert(err);
      });
  }, [month]);

  return (
    <div>
      <input
        type="month"
        value={month}
        onChange={e => setMonth(e.target.value)}
      />
      <p>Salary(Rs.) :  {salary} /-</p>
      {month
        ?
        <div>
          <p>{moment(month).format("MM-YYYY")}</p>
          <p>Expected Salary(Rs.) :  {expectedSalary} /-</p>
        </div>
        : 
        null
      }
    </div >
  )
}

export default Salary;