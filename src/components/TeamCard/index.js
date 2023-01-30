// Write your code here
import {Link} from 'react-router-dom'

import './index.css'

const TeamCard = props => {
  const {teamCard} = props
  const {name, teamImageUrl, id} = teamCard

  return (
    <Link to={`/team-matches/${id}`} className="team-link">
      <li className="team-card-list-container">
        <img alt={`${name}`} src={teamImageUrl} className="team-image" />
        <div>
          <p className="team-name">{name}</p>
        </div>
      </li>
    </Link>
  )
}

export default TeamCard
