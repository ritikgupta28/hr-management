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
        const response = await fetch('https://hr-management-web-app-api.herokuapp.com/salary', {
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
        setExpectedSalary(resData["expectedSalary"]?.toPrecision(6));
        setSalary(resData["salary"]?.toPrecision(6));
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
          <div>
              <Typography>
                Salary(₹) :  {salary} /-
              </Typography>
              <TextField
                  type="month"
                  value={month}
                  onChange={e => setMonth(e.target.value)}
                  variant="outlined"
                  label="Month"
              />
              {month
                ?
                <div>
                  <Typography>
                    {moment(month).format("MM-YYYY")}
                  </Typography>
                  <Typography>
                    Expected Salary(₹) :  {expectedSalary} /-
                  </Typography>
                </div>
                : 
                null
              }
            </div>
        </div>
      }
    </Container>
  )
}

export default Salary;