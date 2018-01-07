import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropdown from 'react-dropdown';
import { fetchPicks } from '../actions/PicksActions';
import { fetchGames } from '../actions/GamesActions';

const weeks = ['1', '2', '3', '4',
               '5', '6', '7', '8',
               '9', '10', '11', '12',
               '13', '14', '15', '16', '17']

class WeeksDropDown extends Component {
  onWeekChange(week) {
    const { user } = this.props;
    this.props.onWeekChange(user, week)
  }

  render () {
    const defaultOption = this.props.week['week'].toString();

    return (
      <div>
      Select a Week:
        <div style={styles.dropdownStyle}>
          <Dropdown options={weeks} onChange={(week) => this.onWeekChange(week.value)} value={defaultOption} />
        </div>
      </div>
    )
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
    onWeekChange: (user, week) => {
      dispatch(fetchGames(week))
      dispatch(fetchPicks(user, week))
    }
  }
}

const styles = {
  dropdownStyle: {
    width: '75px',
    margin: '10px auto',
    justifyContent: 'center'
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeeksDropDown);
