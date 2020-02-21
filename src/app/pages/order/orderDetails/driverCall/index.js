import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import history from '../../../../routing'

const Call = (props) => {
  let [show, setShow] = useState(props.show)

  const handleClick = () => {
    setShow(false)
    history.push(props.path)
  }

  return (
    <div className='call-driver' style={show === true ? {display: 'block'} : {display: 'none'}}>
      <div onClick={handleClick} className='call-driver-opacity'></div>
      <div className='call-driver-child'>
        <span>Status: {props.status}</span>
        <span>Name: {props.login}</span>
        <span>Email: {props.email}</span>
        <span>Phone: +380501231212</span>
      </div>
    </div>
  )
}

export default Call
