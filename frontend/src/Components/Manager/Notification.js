import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import "./Notification.css"

function Notification() {
  const [date, onDateChange] = useState(new Date());

  const mark = [
    '04-01-2021',
  ]
  const mark1 = [
    '03-01-2021',
    '05-01-2021'
  ]
  
  return (
    <div>
      <Calendar
        onChange={onDateChange}
        value={date}
        tileClassName={({ date, view }) => {
          if (mark.find(x => x === moment(date).format("DD-MM-YYYY"))) {
            return 'highlight'
          }
          if (mark1.find(x => x === moment(date).format("DD-MM-YYYY"))) {
            return 'highlight1'
          }
        }
        }
      />
    </div>
  );
}

export default Notification;