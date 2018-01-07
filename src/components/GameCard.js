import React, { Component } from 'react';
import { connect } from 'react-redux';
import momentjs from 'moment';
import Moment from 'react-moment';
import 'moment-timezone';

import TeamRow from './TeamRow';
import { changePick } from '../actions/PicksActions';

class GameCard extends Component {
  state = {
    gameHasStarted: null
  }

  onValueChange(e) {
    const date = '20181231';
    const startTime = '12:30PM';
    const { user, week } = this.props;
    console.log(this.props);
    if (this.checkGameHasStarted(startTime, date)) {
      this.setState({gameHasStarted: true});
      return;
    }
    const key = this.props.title;
    const team = e.target.getAttribute('name');

    //const prevValue = this.state.guessValue;
    const value = e.target.value;

    if (value === "") {
      //this.props.changeNumberUsed(null, prevValue);
      this.props.onPickChange(user.uid, week.week, key, { guessValue: null, teamGuess: null });
      //this.props.changePickObject(this.props.gameId, {teamGuess: null, guessValue: null });
    } else {
      //this.props.changeNumberUsed(value, prevValue);
      this.props.onPickChange(user.uid, week.week, key, { guessValue: value, teamGuess: team });
      //this.props.changePickObject(this.props.gameId, {teamGuess: key, guessValue: value });
    }
  }

  componentWillMount() {
  const date = '20181231';
  const startTime = '12:30PM';
  if (this.checkGameHasStarted(startTime, date))
    this.setState({gameHasStarted: true});
  }

  formatGameTimeHeader(time, date) {
      //gameTime format is two seperate strings, which have been scraped from nfl.com
      //this is required to convert them to a proper datetime object using moment,
      //and format it nicely for the user
      const dateToFormat = date + ' ' + time;
      const momentObj = (momentjs.tz(dateToFormat, "YYYYMMDD hh:mmAA", "America/New_York"));
      const momentDate = <Moment format="ddd MMM D">{momentObj}</Moment>
      const momentTime = (time==='FINAL') ? 'FINAL' : <Moment format="h:mm z" tz="America/Edmonton">{momentObj}</Moment>
      return (<tr>
                <th>{momentDate}</th>
                <th>{momentTime}</th>
                <th>{this.checkGameHasStarted(time, date) && time !=='FINAL' ? "FINAL" : ""}</th>
              </tr>)
  }

  checkGameHasStarted(time, date) {
    //checks whether the game has started or not
    const dateToFormat = date + ' ' + time;
    if (momentjs.tz(dateToFormat, "YYYYMMDD hh:mmAA", "America/New_York") <= momentjs())
      return true;
    return false;
  }

  render() {
    var teamGuess, guessValue;
    if (this.props.pick) {
      teamGuess = this.props.pick.teamGuess;
      guessValue = this.props.pick.guessValue;
    }
    else {
      teamGuess = '';
      guessValue = null;
    }

    const { homeTeam, awayTeam } = this.props.game;
    const date = '20181231';
    const startTime = '12:30PM';

    return(
      <table style={styles.cardStyle}>
        <thead>
          {this.formatGameTimeHeader(startTime, date)}
        </thead>
        <tbody>
          <TeamRow
            name = 'A'
            teamName = {awayTeam}
            teamGuess = {teamGuess}
            guessValue = {guessValue}
            onValueChange = {this.onValueChange.bind(this)}
            gameHasStarted = {this.state.gameHasStarted}
          />
          <TeamRow
            name = 'H'
            teamName = {homeTeam}
            teamGuess = {teamGuess}
            guessValue = {guessValue}
            onValueChange = {this.onValueChange.bind(this)}
            gameHasStarted = {this.state.gameHasStarted}
          />
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    week: state.week
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPickChange: (user, week, gameId, pick) => dispatch(changePick(user, week, gameId, pick))
  }
}

const styles = {
  cardStyle: {
    display:"inline-block",
    borderStyle:"solid",
    padding: '2px',
    margin: '5px',
    borderCollapse: 'collapse'
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameCard);
