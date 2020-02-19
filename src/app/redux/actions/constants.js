import axios from 'axios'

const myAxios = (data) => axios({
	method: 'put',
	url: 'http://localhost:4000/admin/orders',
	headers: localStorage.authToken ? {
			'Content-Type': `application/json`,
			'Authorization': `Bearer ${localStorage.authToken}`,
		} : {'Content-Type': `application/json`},
	data: JSON.stringify(data)
})

/*const myFetch = () => fetch('http://localhost:4000/admin/orders', {
	method: 'get',
	headers: {
			'Authorization': `Bearer ${localStorage.authToken}`,
			'Content-Type': `application/json`,
		}
}).then(res => res.json).then(res => console.log(res)).catch(e => console.log(e))
*/
export { myAxios }