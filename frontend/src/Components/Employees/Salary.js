import React, { useEffect, useState } from "react";
import moment from "moment";
import { useStateValue } from "../../StateProvider";

function Salary() {

  const [{ id }, dispatch] = useStateValue();
  const [month, setMonth] = useState("");
  const [salary, setSalary] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  
  useEffect(() => {
    fetch('http://localhost:8000/salary', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        month: moment(month).format("MM-YYYY"),
        id: id
      })
    })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        setExpectedSalary(resData["expectedSalary"].toPrecision(4));
        setSalary(resData["salary"].toPrecision(4));
      })
      .catch(err => console.log(err));
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