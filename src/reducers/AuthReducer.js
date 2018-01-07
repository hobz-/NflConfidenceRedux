export default function AuthReducer(
  state = {
    loggedIn: false,
    loading: false
  },
  action
) {
  switch (action.type) {
    case 'REQUEST_AUTH':
      return Object.assign({}, state, {
        loading: true
      })
    case 'RECEIVE_AUTH':
      return Object.assign({}, state, {
        uid: action.user.uid,
        loggedIn: true,
        loading: false
      })
    case 'LOGOUT_AUTH':
      return {
        loggedIn: false,
        loading: false,
        uid: null
      }
    default:
      return state
  }
}
