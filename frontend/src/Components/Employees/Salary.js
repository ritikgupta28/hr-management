import React, { useEffect, useState } from "react";
import moment from "moment";
import { useStateValue } from "../../StateProvider";
import {
  CircularProgress,
  Container,
  TextField,
  Typography
} from "@material-ui/core";

function Salary({ id }) {

  const [{ token }, dispatch] = useStateValue();
  const [month, setMonth] = useState("");
  const [salary, setSalary] = useState("");
  const [expectedSalary, setExpectedSalary] = useState();
  const [loading, setLoading] = useState(true);
  
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
        setLoading(false);
      } catch (err) {
        setLoading(false);
        alert(err);
      }
    }
    if (id !== "null") {
      fetchData();
    }
  }, [month]);

  return (
    <Container>
      {loading
        ?
        <CircularProgress />
        :
        <div>
          <Typography>
        Salary(Rs.) :  {salary} /-
      </Typography>
      <TextField
          type="month"
          value={month}
          onChange={e => setMonth(e.target.value)}
          variant="outlined"
          id="standard-basic"
          label="Month" 
      />
      {month
        ?
        <div>
          <Typography>
            {moment(month).format("MM-YYYY")}
          </Typography>
          <Typography>
            Expected Salary(Rs.) :  {expectedSalary} /-
          </Typography>
        </div>
        : 
        null
      }
        </div>
      }
    </Container>
  )
}

export default Salary;