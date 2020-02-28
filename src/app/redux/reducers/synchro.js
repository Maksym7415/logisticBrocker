const synchroReducer = (state = {}, action) => {
  if (action.type === 'driversBids') {
    return {
      id: action.id
    }
  }

  if (action.type === 'delOrder') {
    return {}
  }

  return state
}

const addDriverOrder = (id) => {
  const actionAdd = () => ({type: 'driversBids', id})

  return (dispatch) => dispatch(actionAdd())
}

const delOrder = () => {
  const del = () => ({type: 'delOrder'})

  return (dispatch) => dispatch(del())
}

export { synchroReducer, addDriverOrder, delOrder }