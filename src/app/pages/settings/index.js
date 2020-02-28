import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Modal from '../../components/modal'
import history from '../../routing'
import { actionAddUser } from '../../redux/actions'
import { dive } from '../../functions'

const AddUser = (props) => {
  let [login, setLogin] = useState('')
  let [password, setPassword] = useState('')
  let [role, setRole] = useState('user')
  let [name, setName] = useState('')
  let [email, setMail] = useState('')

  const handleLogin = (e) => setLogin(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)
  const handleRole = (e) => setRole(e.target.value)
  const handleName = (e) => setName(e.target.value)
  const handleEmail = (e) => setMail(e.target.value)
  const handleClick = () => {
    if (login !== '' && password !== '' && email !== '') {
      props.register({
        login,
        password,
        role,
        name,
        email
      })
    }
  }

  useEffect(() => {
    if (props.user) {
      history.push({
        pathname: '/message',
        state: {
          message: 'New user added successfully'
        }
      })
    }
  }, [props.user])

  return (
    <Modal clickOpacity={() => history.push('/')} width='50%' height='50%' show={true} >
      <div className='add-user'>
      <h3>Add new user</h3>
        <div>
          <label>
            <span>*</span>
            <input placeholder='login' value={login} onChange={handleLogin} />
          </label>
          <label>
            <span>*</span>
            <input placeholder='password' value={password} onChange={handlePassword} />
          </label>
        </div>
        <div>
          <label>
            <span>*</span>
            <select value={role} onChange={handleRole} >
              <option>user</option>
              <option>manager</option>
              <option>admin</option>
            </select>
          </label>
          <label>
            <span>*</span>
            <input placeholder='name' value={name} onChange={handleName} />
          </label>
        </div>
        <div>
          <label style={{marginRight: 'auto'}}>
            <input placeholder='email' value={email} onChange={handleEmail} />
          </label>
        </div>
          <button onClick={handleClick}>Submit</button>
      </div>
    </Modal>
  )
}

export default connect((state) => ({user: dive`${state}promise.addUser.payload.data`}), {register: actionAddUser})(AddUser)
