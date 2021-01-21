import React, { useState } from 'react'
import {
  Button,
  Divider,
  Link,
  Typography
} from '@material-ui/core';

function TeamDescription({ team }) {

  const [expand, setExpand] = useState(false);

  const renderTeamData = () => {
    if(expand) {
      return (
        <div>
          <Typography>Description: </Typography>
            <Typography key={team._id} style={{ marginLeft: '20px' }}>{team.description}
          </Typography>
          <Typography>Members: </Typography>
          {team.members?.map(member => (
            <Typography key={member._id} style={{marginLeft: '20px'}}>
              <Link href={`/employee/${member.employeeId._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                {member.employeeId.email}
              </Link>
            </Typography>
            ))}
      </div>
      )
    }
  }

  return (
    <div>
      <Button onClick={e => setExpand(!expand)} fullWidth>
       {team.name}
      </Button>
      <Divider />
      {renderTeamData()}
    </div>
  )
}

export default TeamDescription;