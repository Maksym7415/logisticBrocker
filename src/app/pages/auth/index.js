import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { actionOnLogin } from '../../redux/actions'
import { dive } from '../../functions'
import Modal from '../../components/modal'

const Authorization = (props) => {
	let [login, setLogin] = useState('')
	let [password, setPassword] = useState('')
	let [loginFalse, setLoginFalse] = useState(true)
	let [passwordFalse, setPasswordFalse] = useState(true)

	let loginCheck = new RegExp(/(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[a-z0-9A-Z]{6,}/g)
	let passwordCheck = new RegExp(/^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[a-z0-9A-Z]{6,8}$/g)

	const handleLogin = (e) => {
		if (loginFalse) {
			setLogin(e.target.value)
			setLoginFalse(true)
		} else {
			setLogin(e.target.value)
			login.match(loginCheck) === null ? setLoginFalse(false) : setLoginFalse(true)
		}
	}

	const handlePassword = (e) => {
		if (passwordFalse) {
			setPassword(e.target.value)
		} else {
			setPassword(e.target.value)
			password.match(passwordCheck) !== null ? setPasswordFalse(true) : setPasswordFalse(false)
		}
	}

	const handleClick = () => {
		if (login.match(loginCheck) !== null && password.match(passwordCheck) !== null) {
			props.login(login, password)
		} else {
			if (login.match(loginCheck) === null) {
				setLoginFalse(false)
			}
			if (password.match(passwordCheck) === null) {
				setPasswordFalse(false)
			}
		}
	}

	// const handleClick = () => props.login(login, password)

	return !props.token ? (
		<Modal width='30%' height='30%' show>
			<div className='login-form'>
				<input className={loginFalse ? 'black-login' : 'red-login'} placeholder='enter login' value={login} onChange={handleLogin} />
				<p style={loginFalse === true ? {display: 'none'} : {display: 'block'}} className={loginFalse ? 'black-login' : 'red-login'}>Inavalid login (A-Z, 0-9, a-z, 6 symbols)</p>
				<input className={passwordFalse ? 'black-login' : 'red-login'} placeholder='enter password' value={password} onChange={handlePassword} />
				<p style={passwordFalse ? {display: 'none'} : {display: 'block'}} className={passwordFalse ? 'black-login' : 'red-login'}>Wrong password (a-z, 0-9, A-Z, from 6 to 8symbols) symbols (A-Z, 0-9, a-z)</p>
				<p className='invalid-login' style={props.data === 'REJECTED' ? {display: 'block'} : {display: 'none'}}>Invalid login or password</p>
				<button onClick={handleClick}>Login</button>
			</div>
		</Modal>
	) : <Redirect to='/' />
}

export default connect((state) => ({token: dive`${state}token.token`, data: dive`${state}promise.LOGIN.status`}), {login: actionOnLogin})(Authorization)
