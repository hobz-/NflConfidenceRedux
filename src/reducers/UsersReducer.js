export default function UsersReducer(
  state = {
    users: {}
  },
  action
) {
  switch(action.type) {
    case 'RECEIVE_USERS':
      return Object.assign({}, state, {
        users: action.users
      })
    default:
      return state
  }
}
