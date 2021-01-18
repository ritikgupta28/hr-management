import React, { useState } from 'react'
import { Divider, ListItem, ListItemText } from '@material-ui/core';

function TeamDescription({ team }) {

  const [expand, setExpand] = useState(false);

  const renderTeamData = () => {
    if(expand) {
      return (
        <div>
          <p>Members: </p>
        {team.members?.map(member => (
           <p key={member._id}>{member.employeeId.email}</p>
        ))}
        <p key={team._id}>{team.description}</p>
      </div>
      )
    }
  }

  return (
    <div>
      <ListItem button onClick={e => setExpand(!expand)}>
        <ListItemText primary={team.name} />
      </ListItem>
      <Divider />
      <ListItem>
        {renderTeamData()}
      </ListItem>
    </div>
  )
}

export default TeamDescription;