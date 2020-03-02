const promiseReducer = (state = {}, action) => {
	const actions = {
		PROMISE() {
			const {status, name, payload, error} = action
			return {
				...state,
				[name]: {status, payload, error}
			}
		}
	}

	if (action.type in actions) {
		return actions[action.type]()
	}
	return state
}
  
function actionPromise(name, promise) {
	const actionPending = () => ({type: 'PROMISE', status: 'PENDING', name, payload: null, error: null})
	const actionResolved = (payload) => ({type: 'PROMISE', status: 'RESOLVED', name, payload, error: null})
	const actionError = (error) => ({type: 'PROMISE', status: 'ERROR', name, payload: null, error})

	return async (dispatch) => {
		dispatch(actionPending())
		try {
			let payload = await promise ()
			dispatch(actionResolved(payload))
		} catch (error) {
			dispatch(actionError(error))
		}
	}
}

function actionDeletePromise (name) {
	const actionDelete = () => ({type: 'PROMISE', name})

	return (dispatch) => dispatch(actionDelete())
}

export { promiseReducer, actionPromise, actionDeletePromise }