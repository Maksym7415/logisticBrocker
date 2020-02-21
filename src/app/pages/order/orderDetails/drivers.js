import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Preloader from '../../../components/preloader'
import { dive } from '../../../functions'
import { actionGetDrivers, actionGetOneDriver } from '../../../redux/actions'
import ConfigOrder from './bidConfig'
import Call from './driverCall'
import Modal from '../../../components/modal'
import history from '../../../routing'

const OrderDrivers = (props) => {
  let [driverCheck, setDriverChecked] = useState({})
  let [showCall, setCall] = useState(false)

  const changeDriverCheck = (e) => {
    const item = e.target.name
    const isChecked = e.target.checked
    setDriverChecked(() => {
      if (isChecked === true) {
        return {[item]: isChecked}
      } else {
        return {...driverCheck, [item]: isChecked}
      }
    })
  }

  const handleCall = (id) => {
    props.getOneDriver(id)
    setCall(true)
    console.log(showCall)
  }

  useEffect(() => {
    props.getDrivers()
  },[])
  return (
    <div>
      <h3>Units found: {props.data && props.data.length}</h3>
      <div className='drivers-list'>
      <Call show={showCall}/>
        <div>
          <span></span>
          <span>Unit<i className="fas fa-arrow-up"></i></span>
          <span>Driver</span>
          <span>Vehicle</span>
          <span>Available</span>
          <span>Dimenssions</span>
          <span>Bid</span>
          <span>Call</span>
        </div>
        {props.data ?
          props.data.map((item) =>
          <div key={item.id}>
            <span><input name={item.id} type='checkbox' checked={driverCheck[item.id] || false} onChange={changeDriverCheck} /></span>
            <span>geopos</span>
            <span>{item.login}</span>
            <span>Van</span>
            <span>Poltava 10:00AM</span>
            <span>145x71x76in.</span>
            <span></span>
            <span>
              <button onClick={() => handleCall(item.id)}>DRIVER</button>
              <button onClick={() => handleCall(item.id)}>OWNER</button>
            </span>
          </div>
        ) : <Preloader/>}
      </div>
      <ConfigOrder />
    </div>
  )
}

export default connect((state) => ({data: dive`${state}promise.drivers.payload.data`, driver: dive`${state}promise.oneDriver.payload.data`}), {getDrivers: actionGetDrivers, getOneDriver: actionGetOneDriver})(OrderDrivers)