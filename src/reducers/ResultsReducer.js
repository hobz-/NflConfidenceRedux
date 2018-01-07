export default function ResultsReducer(
  state = {
    isFetching: false,
    results: {}
  },
  action
) {
  switch(action.type) {
    case 'REQUEST_RESULTS':
      return Object.assign({}, state, {
        isFetching: true
      })
    case 'RECEIVE_RESULTS':
      return Object.assign({}, state, {
        results: action.results,
        isFetching: false
      })
    default:
      return state
  }
}
