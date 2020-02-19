import { actionPromise, actionDeletePromise } from '../reducers/promiseReducer'
import { actionPromiseLogin } from '../reducers/loginReducer'
import { myAxios, myFetch } from './constants'

const actionLogin = (token) => ({type: 'LOGIN', token})
const actionLogout = () =>({type: 'LOGOUT'})
const actionOnLogin = (log, password) => actionPromiseLogin(log, password)
const actionGetAllExternal = () => actionPromise('externalAll', myAxios())
const actionGetOneExternal = (data) => actionPromise('externalOne', myAxios({id: data}))

export { actionLogin, actionLogout, actionOnLogin, actionGetAllExternal, actionGetOneExternal }