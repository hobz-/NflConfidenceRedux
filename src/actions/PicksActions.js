import firebase from '../components/Firebase';

const requestPicks = (user, week) => {
  return {
    type: 'REQUEST_PICKS'
  }
}

const receivePicks = (picks) => {
  return {
    type: 'RECEIVE_PICKS',
    picks
  }
}

export const changePick = (user, week, gameId, pick) => {
  firebase.database().ref(`users/${user}/${week}/picks/${gameId}/`).update(pick);
  return {
    type: 'CHANGE_PICK',
    gameId,
    pick
  }
}


const addNumUsed = (num) => {
  return {
    type: 'ADD_NUM_USED',
    num
  }
}

const clearNumsUsed = () => {
  return {
    type: 'CLEAR_NUMS_USED'
  }
}

export function fetchPicks(user, week) {

  return function (dispatch) {
    //Update app state to inform that an API call is starting
    dispatch(requestPicks(user, week));

    return firebase.database().ref('users/' + user.uid + '/' + week + '/picks/')
    .on('value', (snap) => {
        var picks = {};

        dispatch(clearNumsUsed());

        snap.forEach((pick) => {
          picks[pick.key] = {
            teamGuess: pick.val().teamGuess,
            guessValue: pick.val().guessValue
          }
          dispatch(addNumUsed(parseInt(pick.val().guessValue, 10)))
        })
        dispatch(receivePicks(picks));
      }
    )
  }
}
