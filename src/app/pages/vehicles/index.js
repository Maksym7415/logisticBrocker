import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import Modal from '../../components/modal'
import history from '../../routing'
import { actionGetDrivers } from '../../redux/actions'
import { dive } from '../../functions'

const Vehicles = (props) => {

  useEffect(() => {
    props.getDrivers()
  }, [])

  return (
    <Modal clickOpacity={() => history.push('/')} width='90%' height='90%' show={true} >
      <div className='vehicles-container'>
        <div className='vehicles-header-links'>
        {console.log(props.match)}
          <button style={props.match.path === '/vehicles' ? {'borderBottom': '1px solid #5555ff'} : ''}>VEHICLES</button>
          <button>DRIVERS</button>
          <button>OWNERS</button>
        </div>
        <div>
          <i className="fas fa-times"></i>
          <i className="fas fa-plus"></i>
          <i className="fas fa-redo"></i>
        </div>
        <div className='vehicles-grid-container'>
          <div>
            <span>ID<i className="fas fa-arrow-up"></i></span>
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
            <span><input placeholder='Filter...' /></span>
            <span><input placeholder='Filter...' /></span>
            <span><input placeholder='Filter...' /></span>
            <span><input placeholder='Filter...' /></span>
            <span><input placeholder='Filter...' /></span>
            <span>
              <select>
                <option>All</option>
              </select>
            </span>
            <span><input placeholder='Filter...' /></span>
            <span></span>
            <span>
              <select>
                <option>All</option>
              </select>
            </span>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default connect(state => ({drivers: `${state}promise.drivers.payload.data`}), {getDrivers: actionGetDrivers})(Vehicles)