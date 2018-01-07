import firebase from '../components/Firebase';

const requestAuth = (email, pass) => {
  return {
    type: 'REQUEST_AUTH'
  }
}

export const receiveAuth = (user) => {
  return {
    type: 'RECEIVE_AUTH',
    user
  }
}

const logoutAuth = () => {
  return {
    type: 'LOGOUT_AUTH'
  }
}

export function signInUser(email, pass) {
  return function(dispatch) {
    dispatch(requestAuth(email, pass));
    firebase.auth()
      .signInWithEmailAndPassword(email, pass)
      .then((user) => {
        dispatch(receiveAuth(user));
      })
      .catch((error) => { console.log(error.toString()) });
  }
}

export function signUpUser(email, pass) {
  return function(dispatch) {
    dispatch(requestAuth(email, pass));
    firebase.auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(() => {

        //Update user information in database
        var user = firebase.auth().currentUser;
        var displayName = user.displayName ? user.displayName : user.email.split('@')[0];
        firebase.database().ref('/users/profiles/' + user.uid).update({name: displayName});
        dispatch(receiveAuth(user));
        user.sendEmailVerification().then(function() {
        }).catch(function(error) {
          console.log(error);
        });
      })
      .catch((error) => { console.log(error.toString()) });
  }
}

export function logoutUser() {
  return function(dispatch) {

    firebase.auth().signOut()
      .then(() => {
        console.log("logged Out!");
        dispatch(logoutAuth());
      })
      .catch((error) => { console.log(error.toString()) });
  }
}

const receiveUsers = (users) => {
  return {
    type: 'RECEIVE_USERS',
    users
  }
}


export function fetchUsers() {
  return function (dispatch) {
    return firebase.database().ref('/users/profiles').once('value')
      .then(
        snap => snap.exportVal()
      )
      .then(
        users => dispatch(receiveUsers(users))
      );
  }
}
