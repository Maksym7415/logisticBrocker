import {
	createStore, combineReducers, compose, applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { promiseReducer } from './reducers/promiseReducer'
import { loginReducer} from './reducers/loginReducer'
import { actionLogin } from './actions'
import { synchroReducer } from './reducers/synchro'

const composeEnhancers = composeWithDevTools({trace: true})
const reducers = combineReducers({
	token: loginReducer,
	promise: promiseReducer,
	synchro: synchroReducer
})

const store = createStore(
	reducers,
	composeEnhancers(
		applyMiddleware(thunk)
	)
)

if (localStorage.authToken) {
	store.dispatch(actionLogin(localStorage.authToken))
}

store.subscribe(() => console.log(store.getState()))

export default store
