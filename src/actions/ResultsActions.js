import firebase from '../components/Firebase';

const requestResults = () => {
  return {
    type: 'REQUEST_RESULTS'
  }
}

const receiveResults = (results) => {
  return {
    type: 'RECEIVE_RESULTS',
    results
  }
}

export function fetchResults(week) {

  return function (dispatch) {
    dispatch(requestResults(week));

    return firebase.database().ref(`/results/2017/${week}/users/`).once('value')
      .then(
        snap => snap.exportVal()
      )
      .then(
        results => {
          dispatch(receiveResults(results));
        }
      );
  }
}
