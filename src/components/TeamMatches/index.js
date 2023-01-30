// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

const teamMatchesApiUrl = 'https://apis.ccbp.in/ipl/'

class TeamMatches extends Component {
  state = {matchDetails: [], isLoading: true}

  componentDidMount() {
    this.getMatchedTeam()
  }

  getFormattedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getMatchedTeam = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`${teamMatchesApiUrl}${id}`)

    const idMatchedData = await response.json()

    const updatedMatchDetails = {
      teamBannerUrl: idMatchedData.team_banner_url,
      latestMatchDetails: this.getFormattedData(
        idMatchedData.latest_match_details,
      ),
      recentMatches: idMatchedData.recent_matches.map(eachMatch =>
        this.getFormattedData(eachMatch),
      ),
    }

    this.setState({matchDetails: updatedMatchDetails, isLoading: false})
  }

  renderMatchList = () => {
    const {matchDetails} = this.state
    const {recentMatches} = matchDetails

    return (
      <ul className="match-card-container">
        {recentMatches.map(recentMatch => (
          <MatchCard matchData={recentMatch} key={recentMatch.id} />
        ))}
      </ul>
    )
  }

  renderMatchDetails = () => {
    const {matchDetails} = this.state
    const {teamBannerUrl, latestMatchDetails} = matchDetails
    return (
      <div className="team-matches-container" data-testid="loader">
        <img alt="team-banner" src={teamBannerUrl} className="team banner" />
        <LatestMatch latestMatchData={latestMatchDetails} />
        {this.renderMatchList()}
      </div>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  getClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {isLoading} = this.state
    const className = `team-matches-container ${this.getClassName()}`

    return (
      <div data-testid="loader" className={className}>
        {isLoading ? this.renderLoader() : this.renderMatchDetails()}
      </div>
    )
  }
}

export default TeamMatches
