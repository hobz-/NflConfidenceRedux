export default function WeekReducer(
  state = { week: 16 },
  action
) {
  switch (action.type) {
    case 'CHANGE_WEEK':
      return Object.assign({}, state, {
        week: action.week
      })
    default:
      return state
  }
}
