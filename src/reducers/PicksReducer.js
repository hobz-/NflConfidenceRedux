export default function PicksReducer(
  state = {
    isFetching: false,
    picks: {}
  },
  action
) {
  switch (action.type) {
    case 'REQUEST_PICKS':
      return Object.assign({}, state, {
        isFetching: true,
        picks: {}
      })
    case 'RECEIVE_PICKS':
      return Object.assign({}, state, {
        isFetching: false,
        picks: action.picks
      })
    case 'CHANGE_PICK':
      return Object.assign({}, state, {
        picks: {
          ...state.picks,
          [action.gameId]: {
            teamGuess: action.pick.teamGuess,
            guessValue: action.pick.guessValue
          }
        }
      })
    default:
      return state
  }
}
