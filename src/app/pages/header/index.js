import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import history from '../../routing'
import { dive } from '../../functions'
import { actionGetProfile } from '../../redux/actions'

const Header = (props) => {

  useEffect(() => {
    props.getProfile(props.token)
  }, [])

  return (
    <div className='header'>
      <div>
        <span>BETA LOGISTICS</span>
        <button onClick={() => history.push('/')}>
          <i className='fas fa-envelope' />
          DISPATCH
        </button>
        <button onClick={() => history.push('/bids')}><i className="fas fa-dollar-sign"></i> BUIDS </button>
        <button><i className="fas fa-truck"></i> VEHICLES </button>
        <button><i className="fas fa-cog"></i> SETTINGS </button>
      </div>
      <div>
        <div>
          <span>{props.data && props.data.login}</span>
          <span>{props.data && props.data.acl}</span>
        </div>
        <img alt='avatar' src='../../../../../logo192.png' />
      </div>
    </div>
  )
} 

export default connect(state => ({data: dive`${state}promise.profile.payload.data`, token: dive`${state}token.data.sub.id`}), {getProfile: actionGetProfile})(Header)