import axios from 'axios'

const myAxios = (url, data) => axios({
	method: url.method,
	url: 'http://localhost:4000/'+ url.url,
	headers: localStorage.authToken ? {
			'Content-Type': `application/json`,
			'Authorization': `Bearer ${localStorage.authToken}`,
		} : {'Content-Type': `application/json`},
	data: JSON.stringify(data)
})


const allOrders = {
	url: 'admin/orders',
	method: 'put'
}

const profile = {
	url: 'user/profile',
	method: 'put'
}

const getDrivers = {
	url: 'admin/getAllUsers',
	method: 'put'
}

const sendMail = {
	url: 'admin/sendMail',
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
export { myAxios, allOrders, profile, getDrivers, sendMail }