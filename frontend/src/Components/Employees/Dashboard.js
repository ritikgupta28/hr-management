import React, { useState, useEffect } from 'react';
import Attendance from './Attendance';
import Salary from './Salary';
import "./Dashboard.css"
import { useStateValue } from "../../StateProvider";
import {
  TextField,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  CircularProgress
} from "@material-ui/core";

function Dashboard({ id }) {
  
  const [{ token }, dispatch] = useStateValue();
  const [employee, setEmployee] = useState({});
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8000/employee/' + id, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
        })
        const status = await response.status;
        const resData = await response.json();
        if (status === 500) {
          throw new Error(resData.message);
        }
        setEmployee(resData["employee"]);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        alert(err);
      }
    }
    if (id !== "null") {
      fetchData();
    }
  }, [])

  const onEditEmployee = async () => {
    try {
      const response = await fetch('http://localhost:8000/editEmployee/', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          newEmployee: employee
        })
      })
      const status = await response.status;
      const resData = await response.json();
      if (status === 500) {
        throw new Error(resData.message);
      }
      alert("Done!");
      setEdit(!edit);
    } catch (err) {
      alert(err);
    }
  }

  return (
    <Container>
      {loading
        ?
        <CircularProgress />
        :
        <div className="dashboard">
          <div className="details">
            {!edit 
              ?
              (<Button
                variant="outlined"
                color="primary"
                onClick={e => setEdit(!edit)}
              >
                Edit Profile
              </Button>)
              :
              (<Button
                variant="outlined"
                color="primary"
                onClick={e => setEdit(!edit)}
              >
                Cancel
              </Button>)
            }
          <List>
            <ListItem>
              <ListItemText primary="Name:" />
              <TextField
                value={employee.name}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Email:" />
              <TextField
                value={employee.email}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Team-Name:" />
              <TextField
                value={employee.teamName}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Mobile:" />
              <TextField
                  value={employee.mobile}
                  onChange={e => {
                    if (edit) {
                      setEmployee({ ...employee, mobile: e.target.value })
                    }
                  }}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Address:" />
              <TextField
                  value={employee.address}
                  onChange={e => {
                    if (edit) {
                      setEmployee({ ...employee, address: e.target.value })
                    }
                  }}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="City:" />
              <TextField
                  value={employee.city}
                  onChange={e => {
                    if (edit) {
                      setEmployee({ ...employee, city: e.target.value })
                    }
                  }}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Country:" />
                <TextField
                  value={employee.country}
                  onChange={e => {
                    if (edit) {
                      setEmployee({ ...employee, country: e.target.value })
                    }
                  }}
              />
            </ListItem>
            </List>
            {edit 
              ?
              (<Button
                variant="outlined"
                color="primary"
                onClick={onEditEmployee}
              >
                Submit
              </Button>)
              :
              null
            }
          </div>
          <div className="more">
            <div className="attendance">
              <Attendance id={id} />
            </div>
            <div className="salary">
              <Salary id={id} />
            </div>
          </div>
        </div>
      }
    </Container>
  )
}

export default Dashboard;