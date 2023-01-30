// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {isLoading: true, teamCardItems: []}

  componentDidMount() {
    this.getTeamCards()
  }

  getTeamCards = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')

    const data = await response.json()

    const updatedData = data.teams.map(eachItem => ({
      name: eachItem.name,
      id: eachItem.id,
      teamImageUrl: eachItem.team_image_url,
    }))

    console.log(data)
    this.setState({teamCardItems: updatedData, isLoading: false})
  }

  render() {
    const {teamCardItems, isLoading} = this.state
    return (
      <>
        <div className="ipl-home-container">
          <div className="ipl-logo-container">
            <img
              alt="ipl logo"
              className="ipl-logo"
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            />
            <h1>IPL DashBoard</h1>
          </div>

          {isLoading ? (
            <div data-testid="loader">
              <Loader type="Oval" color="#ffffff" height={50} width={50} />
            </div>
          ) : (
            <ul className="team-card-container">
              {teamCardItems.map(eachTeamCardItem => (
                <TeamCard
                  teamCard={eachTeamCardItem}
                  key={eachTeamCardItem.id}
                />
              ))}
            </ul>
          )}
        </div>
      </>
    )
  }
}

export default Home
