import React, { Component } from 'react';

class TeamRow extends Component {

  isDisabled(teamGuess, pickChar) {
    /* The input field will be disabled for two reasons:
     * 1. The game has started, and so the user can no longer enter picks (this is checked during the
          input fields on change function, and during rendered)
     * 2. The game already has a pick for the other team. This is to protect the user from picking both teams,
     *    by accident or on purpose.
     */
    return ((teamGuess !== null && teamGuess !== pickChar) || this.props.gameHasStarted) ? "disabled" : "";
  }

  render () {
    const { teamName, teamGuess, name, guessValue } = this.props;

    return (
      <tr style={(teamGuess !== null) ? ((teamGuess === name) ? styles.pickedStyle : styles.notPickedStyle) : styles.defaultStyle}>
        <td>
          <img
            style={{verticalAlign: 'middle'}}
            src={`http://i.nflcdn.com/static/site/7.5/img/logos/teams-matte-80x53/${teamName}.png`}
            alt="team-img"
            onChange={(e) => this.props.onValueChange(e)}
          />
        </td>
        <td>{teamName}</td>
        <td>
          <input
            name = {name}
            type="text"
            value={(teamGuess === name) ? guessValue : ""}
            style={{width:"50px"}}
            disabled={this.isDisabled(teamGuess, name)}
            onChange={(e) => this.props.onValueChange(e)}
          />
        </td>
      </tr>
    )
  }
}

const styles = {
  pickedStyle: {
    backgroundColor: '#7fc17f',
    height: '60px'
  },
  notPickedStyle: {
    backgroundColor: "#ff9999",
    height: '60px'
  },
  defaultStyle: {
    backgroundcolor: "none",
    height: '60px'
  }
}

export default TeamRow;
