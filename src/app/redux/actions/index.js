import { actionPromise, actionDeletePromise } from '../reducers/promiseReducer'
import { actionPromiseLogin } from '../reducers/loginReducer'
import { myAxios, myFetch, allOrders, profile, getDrivers, sendMail } from './constants'

const actionLogin = (token) => ({type: 'LOGIN', token})
const actionLogout = () =>({type: 'LOGOUT'})
const actionOnLogin = (log, password) => actionPromiseLogin(log, password)
const actionGetAllExternal = () => actionPromise('externalAll', myAxios(allOrders))
const actionGetOneExternal = (data) => actionPromise('externalOne', myAxios(allOrders,{id: data}))
const actionGetProfile = (data) => actionPromise('profile', myAxios(profile,{id: data}))
const actionGetDrivers = () => actionPromise('drivers', myAxios(getDrivers))
const actionSendMail = (data) => actionPromise('sendMail', myAxios(sendMail, data))

export { actionLogin, actionLogout, actionOnLogin, actionGetAllExternal, actionGetOneExternal, actionGetProfile, actionGetDrivers, actionSendMail }