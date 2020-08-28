import axios from 'axios'

const myAxios = (url, data) => () => axios({
	method: url.method,
	url: `ec2-18-219-225-191.us-east-2.compute.amazonaws.com:8080/${url.url}`,
	headers: localStorage.authToken ? {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${localStorage.authToken}`
	} : {'Content-Type': 'application/json'},
	data: JSON.stringify(data)
})


const allOrders = {
	url: 'api/manager/getOrders',
	method: 'post'
}

const orderOne = {
	url: 'api/manager/getOrderInfo',
	method: 'post'
}

const getDrivers = {
	url: 'api/manager/getDrivers',
	method: 'get'
}

const sendMail = {
	url: 'api/manager/sendMail',
	method: 'post'
}

const changeStackStatus = {
	url: 'api/manager/changeStakeStatus',
	method: 'put'
}

const stackStatus = {
	url: 'api/manager/changeStakeStatus',
	method: 'put'
}

const driverOne = {
	url: 'api/manager/getDriver',
	method: 'post'
}

const profile = {
	url: 'api/manager/getProfile',
	method: 'post'
}

const placeBid = {
	url: 'api/manager/placeBid',
	method: 'post'
}

const getStakes = {
	url: 'api/manager/getStakes',
	method: 'post'
}

const addUser = {
	url: 'api/admin/register',
	method: 'post'
}

export {
	myAxios, allOrders, orderOne, getDrivers, sendMail, changeStackStatus, stackStatus, driverOne, profile, placeBid, getStakes, addUser
}
