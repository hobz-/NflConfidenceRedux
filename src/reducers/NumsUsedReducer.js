export default function NumsUsedReducer(
  state = {
    numsUsed: []
  },
  action
) {
  switch(action.type) {
    case 'CLEAR_NUMS_USED':
      return {
        numsUsed: []
      }
    case 'ADD_NUM_USED':
      return {
        numsUsed: state.numsUsed.concat(action.num)
      }
    default:
      return state
  }
}
