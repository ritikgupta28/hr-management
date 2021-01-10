import React, { useState } from 'react'

function TeamDescription({ team }) {

  const [expand, setExpand] = useState(false);

  const renderTeamData = () => {
    if(expand) {
      return (
        <div>
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
      <button
        onClick={e => setExpand(!expand)}
      >
        {team.name}
      </button>
      {renderTeamData()}
    </div>
  )
}

export default TeamDescription;