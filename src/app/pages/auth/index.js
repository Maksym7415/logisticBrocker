import React, { useState, useEffect } from 'react'
import { actionOnLogin } from '../../redux/actions'
import { connect } from 'react-redux'
import { dive } from '../../functions'
import { myAxios } from '../../redux/actions/constants' 

const promise = () => fetch('http://localhost:4000/login', {
	method: 'put',
	headers: {
    'Content-Type': `application/json`,
  },
  body: JSON.stringify({
    "login": "admin",
    "password": "admin"
  })
}).then(res => res.json()).then(res => console.log(res)).catch((e) => console.log(e))

const Authorization = (props) => {
	let [login, setLogin] = useState('')
	let [password, setPassword] = useState('')

	const handleLogin = (e) => setLogin(login = e.target.value)
	const handlePassword = (e) => setPassword(password = e.target.value)
	const handleClick = () => props.login(login, password)

  return (
    <div>
			<input value= {login} onChange= {handleLogin} />
			<input value= {password} onChange= {handlePassword} />
			<button onClick= {handleClick}>Login</button>
    </div>
  )
}

export default connect(state => ({data: dive`${state}.promise`}), {login: actionOnLogin})(Authorization)