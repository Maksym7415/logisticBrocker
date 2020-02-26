import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Preloader from '../../../components/preloader'
import { dive } from '../../../functions'
import { actionGetDrivers, actionGetOneDriver } from '../../../redux/actions'
import ConfigOrder from './bidConfig'
import Call from './driverCall'
import Modal from '../../../components/modal'
import getDistance from 'geolib/es/getDistance'

const OrderDrivers = (props) => {
  let [driverCheck, setDriverChecked] = useState({})
  let [showCall, setCall] = useState(false)
  let [driver, setDriver] = useState('')
  let [checkboxStatus, setCheckboxStatus] = useState(false)

  const changeDriverCheck = (e) => {
    const item = e.target.name
    const isChecked = e.target.checked
    setCheckboxStatus(isChecked)
    setDriverChecked(() => {
      if (isChecked === true) {
        return {[item]: isChecked}
      } else {
        return {...driverCheck, [item]: isChecked}
      }
    })
    if (isChecked === true) {
      setDriver(props.data.filter((drive) => drive.id == item))
    }
  }

  const handleCall = (id) => {
    setCall(true)
    props.getOneDriver(id)
  }

  useEffect(() => {
    props.getDrivers()
  }, [])

  return (
    <div>
      <h3>Units found: {props.data && props.data.length}</h3>
      <div className='drivers-list-modal-wrapper'>
      <Modal clickOpacity={() => setCall(false)} width={'40%'} height={'60%'} show={showCall}>
        <Call data={props.driver}/>
      </Modal>
      <div className='drivers-list'>
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
        {props.data && props.order ?
          props.data.sort((a, b) => getDistance({latitude: +a.latitude, longitude: +a.longitude}, {latitude: +props.order.deliver_latitude, longitude: +props.order.deliver_longitude}) - getDistance({latitude: +b.latitude, longitude: +b.longitude}, {latitude: +props.order.deliver_latitude, longitude: +props.order.deliver_longitude})).map((item) => (
            <div key={item.id} >
              <span>
              {console.log(item.id)}
                <input
                  name={item.id}
                  type='checkbox'
                  checked={driverCheck[item.id] || false}
                  onChange={changeDriverCheck}
                  />
              </span>
              <span>{Math.floor(getDistance({latitude: +item.longitude, longitude: +item.latitude}, {latitude: +props.order.deliver_latitude, longitude: +props.order.deliver_longitude})/1600)}</span>
              <span>{item.name}</span>
              <span>Van</span>
              <span>Poltava 10:00AM</span>
              <span>145x71x76in.</span>
              <span></span>
              <span>
                <button onClick={() => handleCall(item.id)}>DRIVER</button>
                <button onClick={() => handleCall(item.id)}>OWNER</button>
              </span>
            </div>
          )) : <Preloader />}
      </div>
      </div>
      <ConfigOrder status={checkboxStatus} driver={driver} />
    </div>
  )
}

export default connect((state) => ({data: dive`${state}promise.drivers.payload.data`, driver: dive`${state}promise.oneDriver.payload.data`}), {getDrivers: actionGetDrivers, getOneDriver: actionGetOneDriver})(OrderDrivers)