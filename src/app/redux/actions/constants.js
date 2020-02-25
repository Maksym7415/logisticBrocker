import axios from 'axios'

const myAxios = (url, data) => axios({
	method: url.method,
	url: 'http://localhost:8080/'+ url.url,
	headers: localStorage.authToken ? {
			'Content-Type': `application/json`,
			'Authorization': `Bearer ${localStorage.authToken}`,
		} : {'Content-Type': `application/json`},
	data: JSON.stringify(data)
})


const allOrders = {
	url: 'api/manager/getOrders',
	method: 'get'
}

const orderOne = {
	url: 'api/manager/getOrderInfo',
	method: 'post'
}

const getDrivers = {
	url: 'api/manager/getDrivers',
	method: 'get'
}

const placeBid = {
	url: '',
	method: 'post'
}

const sendMail = {
	url: 'admin/sendMail',
	method: 'post'
}

const changeStackStatus = {
	url: '',
	method: 'put'
}

const stackStatus = {
	url: '',
	method: 'get'
}

const driverOne = {
	url: 'api/driver/getDriver',
	method: 'post'
}

const profile = {
	url: 'user/profile',
	method: 'put'
}
/*const myFetch = () => fetch('http://localhost:4000/admin/orders', {
	method: 'get',
	headers: {
			'Authorization': `Bearer ${localStorage.authToken}`,
			'Content-Type': `application/json`,
		}
}).then(res => res.json).then(res => console.log(res)).catch(e => console.log(e))
*/
export { myAxios, allOrders, orderOne, getDrivers, placeBid, sendMail, changeStackStatus, stackStatus, driverOne, profile }