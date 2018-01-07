import firebase from '../components/Firebase';

const changeWeek = (week) => {
  return {
    type: 'CHANGE_WEEK',
    week
  }
}

const requestGames = (week) => {
  return {
    type: 'REQUEST_GAMES',
    week
  }
}

const receiveGames = (games) => {
  return {
    type: 'RECEIVE_GAMES',
    games
  }
}

export function fetchGames(week) {

  return function (dispatch) {
    //Update week in state
    dispatch(changeWeek(week));
    //Update app state to inform that an API call is starting
    dispatch(requestGames(week));

    return firebase.database().ref('/games/2017/allGames/' + week).once('value')
      .then(
        snap => snap.exportVal()
      )
      .then(
        games => dispatch(receiveGames(games))
      );
  }
}
