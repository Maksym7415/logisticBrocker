import React, { useState, useEffect } from 'react'
import Preloader from '../../../../components/preloader'

const Call = (props) => {

  return props.data ? (
    <div className='call-driver'>
      <div>
        <span>Status: {props.data.status}</span>
        <span>Name: {props.data.login}</span>
        <span>Email: {props.data.email}</span>
        <span>Phone: +380501231212</span>
      </div>
    </div>
  ) : <Preloader />
}

export default Call
