import React, { useState } from 'react'
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core';

function TeamDescription({ team }) {

  const [expand, setExpand] = useState(false);

  const renderTeamData = () => {
    if(expand) {
      return (
        <div>
          <Typography>Members: </Typography>
          <List>
            {team.members?.map(member => (
              <ListItem key={member._id}>
                <ListItemText primary={member.employeeId.email} />
              </ListItem>
            ))}
            <Typography key={team._id}>{team.description}</Typography>
          </List>
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