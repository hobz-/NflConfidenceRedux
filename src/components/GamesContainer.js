import React, { Component } from 'react';
import { connect } from 'react-redux';

import GameCard from './GameCard';
import PickTracker from './PickTracker';

class GamesContainer extends Component {
  render() {
    const games = this.props.games['games'];
    const picks = this.props.picks['picks'];
    return(
      <div>
        <PickTracker/>
        {Object.keys(games).map((game, id) => {
            return(
              <GameCard
                key={id}
                title={game}
                game={games[game]}
                pick={picks[game]}
              />
            )
          })
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    games: state.games,
    picks: state.picks
  }
}

export default connect(mapStateToProps)(GamesContainer);
