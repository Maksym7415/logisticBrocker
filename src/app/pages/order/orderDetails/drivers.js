import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Preloader from '../../../components/preloader'
import { dive } from '../../../functions'
import { actionGetDrivers } from '../../../redux/actions'
import ConfigOrder from './bidConfig'
import Checkbox from './checkbox'

class OrderDrivers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      driverCheck: new Map()
    }
    this.changeDriverCheck = this.changeDriverCheck.bind(this)
  }

  changeDriverCheck (e) {
    const item = e.target.name
    const isChecked = e.target.checked
    this.setState((prevState) => ({driverCheck: prevState.driverCheck.set(item, isChecked)}))
    console.log(this.state.driverCheck)
    console.log(item)
  }

render() {
  return (
    <div>
      <h3>Units found: {this.props.data && this.props.data.length}</h3>
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
        {this.props.data ?
          this.props.data.map((item) =>
          <div key={item.id}>
            <span><Checkbox name={item.id} checked={this.state.driverCheck.get(item.id)} onChange={this.changeDriverCheck} /></span>
            <span>geopos</span>
            <span>{item.login}</span>
            <span>Van</span>
            <span>Poltava 10:00AM</span>
            <span>145x71x76in.</span>
            <span></span>
            <span>
              <button>DRIVER</button>
              <button>OWNER</button>
            </span>
          </div>
        ) : <Preloader/>}
      </div>
      <ConfigOrder display={this.state.driverCheck === false ? {display: 'none'} : {display: 'flex'}}/>
    </div>
  )
  }

  componentDidMount() {
    this.props.getDrivers()
  }
}

/*const OrderDrivers = (props) => {
  let [driverCheck, setDriverChecked] = useState(false)

  const changeDriverCheck = () => setDriverChecked(driverCheck = !driverCheck)

  useEffect(() => {
    props.getDrivers()
  },[])

  return (
    <div>
      <h3>Units found: {props.data && props.data.length}</h3>
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
        {props.data ?
          props.data.map((item) =>
          <div key={item.id}>
            <span><input type='checkbox' checked={driverCheck} onChange={changeDriverCheck} /></span>
            <span>geopos</span>
            <span>{item.login}</span>
            <span>Van</span>
            <span>Poltava 10:00AM</span>
            <span>145x71x76in.</span>
            <span></span>
            <span>
              <button>DRIVER</button>
              <button>OWNER</button>
            </span>
          </div>
        ) : <Preloader/>}
      </div>
      <ConfigOrder display={driverCheck === false ? {display: 'none'} : {display: 'flex'}}/>
    </div>
  )
}*/

export default connect(state => ({data: dive`${state}promise.drivers.payload.data`}), {getDrivers: actionGetDrivers})(OrderDrivers)