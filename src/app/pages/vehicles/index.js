import React, {useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Modal from '../../components/modal'
import history from '../../routing'
import { actionGetDrivers } from '../../redux/actions'
import { dive } from '../../functions'
import Preloader from '../../components/preloader'
import { addDriverOrder, delOrder } from '../../redux/reducers/synchro'

const Vehicles = (props) => {
  let [drivers, setDrivers] = useState([])
  let [status, setStatus] = useState('')
  let [flag, setFlag] = useState(false)

  const handleStatus = (e) => {
    if (e.target.value === 'All') {
      setDrivers(props.drivers)
      setStatus(e.target.value)
    }
    if (e.target.value === 'NOT AVAILABLE') {
      setDrivers(() => props.drivers.filter((item) => item.status === 'Not Available'))
      setStatus(e.target.value)
    }
    if (e.target.value === 'AVAILABLE') {
      setDrivers(() => props.drivers.filter((item) => item.status === 'Available'))
      setStatus(e.target.value)
    }
    if (e.target.value === 'IN SERVICE') {
      setDrivers(() => props.drivers.filter((item) => item.status === 'In service'))
      setStatus(e.target.value)
    }
  }

  const handleRefresh = () => props.getDrivers()
  const handleClose = () => history.push('/')
  const handleAddVehicle = () => history.push('/settings')
  const handleDriverFlag = (id) => {
    if(flag === false) {
      props.addDriverOrder(id)
      setFlag(true)
    } else {
      props.delOrder()
      setFlag(false)
    }
  }

  useEffect(() => {
    props.getDrivers()
  }, [])

  useEffect(() => {
    if (props.drivers) {
      setDrivers(props.drivers)
    }
  }, [props.drivers])

  return (
    <Modal clickOpacity={() => history.push('/')} width='90%' height='90%' show={true} >
      <div className='vehicles-container'>
        <div className='vehicles-header-links'>
          <button onClick={() => history.push('/vehicles')} className={props.match.url === '/vehicles' ? 'border' : 'border-none'}>VEHICLES</button>
          <button onClick={() => history.push('/vehicles/drivers')} className={props.match.url === '/vehicles/drivers' ? 'border' : 'border-none'}>DRIVERS</button>
          <button
            onClick={() => history.push('/vehicles/owners')}
            className={props.match.url === '/vehicles/owners' ? 'border' : 'border-none'}
          >
            OWNERS
          </button>
        </div>
        <div>
          <i onClick={handleClose} className='fas fa-times' />
          <i onClick={handleAddVehicle} className='fas fa-plus' />
          <i onClick={handleRefresh} className='fas fa-redo' />
        </div>
        <div className='vehicles-grid-container'>
          <div>
            <span>
              ID
              <i className='fas fa-arrow-up' />
            </span>
            <span>Sylectus ID</span>
            <span>Drivers</span>
            <span>Type</span>
            <span>Size</span>
            <span>Status</span>
            <span>Available City</span>
            <span>Available Date</span>
            <span>Actions</span>
          </div>
          <div>
            <input placeholder='Filter...' />
            <input placeholder='Filter...' />
            <input placeholder='Filter...' />
            <input placeholder='Filter...' />
            <input placeholder='Filter...' />
            <select value={status} onChange={handleStatus}>
              <option>All</option>
              <option>NOT AVAILABLE</option>
              <option>AVAILABLE</option>
              <option>IN SERVICE</option>
            </select>
            <input placeholder='Filter...' />
            <span></span>
            <select>
              <option>All</option>
            </select>
          </div>
          {drivers.length !== 0 ? drivers.map((item) => {return (
            <div className='drivers-item' key={item.id}>
              <span>{item.id}</span>
              <span></span>
              <span>{item.name}</span>
              <span>{item.vehicle.model}</span>
              <span>{`${item.vehicle.length}x${item.vehicle.width}x${item.vehicle.height}`}</span>
              <span className={item.status === 'Not Available' ? 'red' : 'green'}>{item.status}</span>
              <span></span>
              <span></span>
              <span>
                <i onClick={() => handleDriverFlag(item.id)} className='far fa-flag' />
                <i className='far fa-star' />
                <i className='fas fa-pen' />
              </span>
            </div>
          )}) : <Preloader />}
        </div>
      </div>
    </Modal>
  )
}

export default connect((state) => ({drivers: dive`${state}promise.drivers.payload.data`, flag: dive`${state}synchro`}), {getDrivers: actionGetDrivers, addDriverOrder, delOrder})(Vehicles)