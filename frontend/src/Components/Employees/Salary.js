import React, { useEffect, useState } from "react";
import moment from "moment";
import { useStateValue } from "../../StateProvider";
import { Container } from "@material-ui/core";

function Salary({ id }) {

  const [{ token }, dispatch] = useStateValue();
  const [month, setMonth] = useState("");
  const [salary, setSalary] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8000/salary', {
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
        const status = await response.status;
        const resData = await response.json();
        if (status === 500) {
          throw new Error(resData.message);
        }
        setExpectedSalary(resData["expectedSalary"]?.toPrecision(4));
        setSalary(resData["salary"]?.toPrecision(4));
      } catch(err) {
        alert(err);
      }
    }
    if (id !== "null") {
      fetchData();
    }
  }, [month]);

  return (
    <Container>
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
    </Container>
  )
}

export default Salary;