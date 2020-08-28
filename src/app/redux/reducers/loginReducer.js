import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { actionLogin } from '../actions'

const loginReducer = (state = {}, action) => {
	const actions = {
		LOGIN() {
			localStorage.authToken = action.token
			return {token: action.token, data: jwt_decode(action.token)}
		},
		LOGOUT() {
			localStorage.removeItem('authToken')
			return {}
		}
	}

	if (action.type in actions) {
		return actions[action.type]()
	}
	return state
}

function actionPromiseLogin(login, password) {
	const name = 'LOGIN'
	const promise = axios({
		method: 'post',
		url: 'http://localhost:8080/api/user/authorization',
		headers: {
			'Content-Type': 'application/json'
		},
		data: JSON.stringify({login, password})
	})
	const actionPending = () => ({
		type: 'PROMISE', status: 'PENDING', payload: null, name, error: null
	})
	const actionResolved = (payload) => ({
		type: 'PROMISE', status: 'RESOLVED', payload, name, error: null
	})
	const actionRejected = (error) => ({
		type: 'PROMISE', status: 'REJECTED', payload: null, name, error
	})

	return async (dispatch) => {
		dispatch(actionPending())
		try {
			let payload = await promise
			dispatch(actionResolved(payload))
			payload.data && dispatch(actionLogin(payload.data))
		} catch (e) {
			dispatch(actionRejected(e))
		}
	}
}

export { loginReducer, actionPromiseLogin }
