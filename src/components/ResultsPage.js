import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchResults } from '../actions/ResultsActions';

import './ResultsTable.css';

/* Component used for rendering weekly results, when the user
 * clicks on the results tab. Results are displayed as a table,
 * with the users in the rows, and the games in the columns.
 * 0 will be displayed for games that were picked incorrectly,
 * whereas the value of the pick will be displayed for games
 * picked correctly. Games missing a pick are given a '-' in order
 * to differentiate them from wrong picks.
 */
class ResultsPage extends Component {
  componentWillReceiveProps(newProps) {
    if (this.props.week !== newProps.week) {
      this.props.fetchResults(newProps.week)
    }
  }

  generateUserRows() {
    //used by the renderResults function to generate the user rows in
    //the final results table
    var usersResults = Object.assign({}, this.props.results);
    const users = Object.assign({}, this.props.users);
    const games = this.props.games;

    var htmlResults = [];
    Object.keys(users).forEach((user) => {
      // For each user in the users object, generate a row for the table
      var userRow = [];
      var totalScore = 0;
      userRow.push(<td key={user}>{users[user].name}</td>);

      Object.keys(games).forEach((gameId) => {
        var result = '';
        //Nested && statement to make sure the given keys/props exist for the
        //returned object. This is necessary in case a user doesn't have results
        //in the usersResults object, or doesn't have a particular gameId in their
        //results for the week (because they missed a pick)
        if (usersResults && usersResults[user] && usersResults[user][gameId])
          result = usersResults[user][gameId].result;
        else
          result = '--';

        if (result !== '--') {
          totalScore += parseInt(result, 10);
        }
        userRow.push(<td key={gameId + '-' + users[user]}>{result}</td>);
      });
      userRow.push(<td key={users[user]}>{totalScore}</td>);
      htmlResults.push(userRow);
    })

    return(htmlResults);

  }

  renderResults() {
    const games = this.props.games;

    //tableHeader is the html elements for the column headers
    var tableHeader = [<th key={'topLeft'}> </th>];
    Object.keys(games).forEach((gameId) => {
      tableHeader.push(<th key={gameId}>{games[gameId].homeTeam} vs. {games[gameId].awayTeam}</th>);
    });
    tableHeader.push(<th key={"Total"}>Total</th>);
    return (
        <table className="results" cellPadding="7">
              <thead>
                <tr>
                  {tableHeader}
                </tr>
              </thead>
              <tbody>
                {this.generateUserRows().map((row, id) => <tr key={id}>{row}</tr>)}
              </tbody>
            </table>
          )
  }

  render() {
    return(
      <div style={{display:'inline-block'}}>
        {"Week " + this.props.week}
        {this.renderResults()}
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    week: state.week.week,
    users: state.users.users,
    games: state.games.games,
    results: state.results.results
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchResults: (week) => dispatch(fetchResults(week))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsPage);
