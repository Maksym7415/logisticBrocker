import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import history from '../../routing'
import { dive } from '../../functions'
import { actionGetProfile, actionLogout } from '../../redux/actions'

const Header = (props) => {

  useEffect(() => {
    if (props.token) {
      props.getProfile(props.token)
    }
  }, [props.token])

  return (
    <div className='header'>
      <div>
        <span>BETA LOGISTICS</span>
        <button onClick={() => history.push('/')}>
          <i className='fas fa-envelope' />
          DISPATCH
        </button>
        <button onClick={() => history.push('/bids')}><i className="fas fa-dollar-sign"></i> BIDS </button>
        <button onClick={() => history.push('/vehicles')}><i className="fas fa-truck" ></i> VEHICLES </button>
        <button><i className="fas fa-cog"></i> SETTINGS </button>
      </div>
      <div>
        <div>
          <span>{props.data && props.data.name}</span>
          <span>{props.data && props.data.user && props.data.user.role}</span>
        </div>
        <img alt='avatar' src='../../../../../logo192.png' />
        {!props.token ? <button className='login-button'><i className="fas fa-sign-in-alt" /></button> : <button onClick={() => props.logout()} className='login-button'><i className="fas fa-sign-out-alt" /></button>}
      </div>
    </div>
  )
} 

export default connect(state => ({data: dive`${state}promise.profile.payload.data`, token: dive`${state}token.data.sub.id_user`}), {getProfile: actionGetProfile, logout: actionLogout})(Header)