import axios from 'axios'

const myAxios = (url, data) => axios({
	method: url.method,
	url: '//test.popovmaksim7415.node.a-level.com.ua/'+ url.url,
	headers: localStorage.authToken ? {
			'Content-Type': `application/json`,
			'Authorization': `Bearer ${localStorage.authToken}`,
		} : {'Content-Type': `application/json`},
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

/*const myFetch = () => fetch('http://localhost:4000/admin/orders', {
	method: 'get',
	headers: {
			'Authorization': `Bearer ${localStorage.authToken}`,
			'Content-Type': `application/json`,
		}
}).then(res => res.json).then(res => console.log(res)).catch(e => console.log(e))
*/
export { myAxios, allOrders, orderOne, getDrivers, sendMail, changeStackStatus, stackStatus, driverOne, profile, placeBid, getStakes, addUser }