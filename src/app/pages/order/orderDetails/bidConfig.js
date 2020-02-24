import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { dive } from '../../../functions'
import { actionSendMail } from '../../../redux/actions'


const ConfigOrder = (props) => {
  let [driver, setDriver] = useState()
  let [order] = useState(props.order && props.order[0])
  let [bidPrice, setBidPrice] = useState(order.price)
  let [bidPriceKm, setBidPriceKm] = useState(bidPrice/order.distance)
  let [driverPrice, setDriverPrice] = useState('')
  let [mail, setMail] = useState('')
  let [driverPriceKm, setDriverPriceKm] = useState('')
  let str = (`
  ${bidPrice} all in
  115 miles out
  Time to pickup: 2h 1min
  Cargo VAN

  We appreciate your buisness
  `)

  const mailParams = {
    from: 'danb41886@gmail.com',
    to: 'popovmaksim7415@gmail.com',
    html: mail,
    author: {
      name: props.manager && props.manager.login,
      mail: 'danb41886@gmail.com'
    }
  }
  const priceKmValue = (num) => {
    if (num !== '') {
      if (!isNaN(+num)) {
        num = +num
        return num.toFixed(2)
      }
      return ''
    } 
    return ''    
  }
  const changeMail = (e) => setMail(e.target.value)
  const handleSendMail = () => props.sendMail(mailParams)
  const changeDriverPrice = (e) => {
    setDriverPrice(e.target.value)
    setDriverPriceKm(e.target.value/order.distance)
  }
  const changeBidPrice = (e) => {
    setBidPrice(e.target.value)
    setBidPriceKm(e.target.value/order.distance)
  }
  const percentValue = () => {
    if (isNaN(Math.floor((bidPrice - driverPrice)/driverPrice * 100))) {
      return '-- %'
    } else {
      if (Math.floor((bidPrice - driverPrice)/driverPrice * 100) === Infinity) {
        return '-- %' 
      } else {
        return Math.floor((bidPrice - driverPrice)/driverPrice * 100)+ ' %'
      }
    }
  }
   
  useEffect(() => {
    if (props.driver && props.driver[0] && props.driver[0].priceKm) {
      setDriverPriceKm(props.driver[0].priceKm)
      setDriverPrice(props.driver[0].priceKm * order.distance)
      setDriver(props.driver[0])
    }
  }, [props.driver])

  return (
    <div style={props.display} className='order-configuration'>
      <h3>Broker email <i>popovmaksim7415@gmail.com</i></h3>
      <div>
      {console.log(props.driver)}
        <div>
          <p>Bid placement ({order.distance}mi)</p>
          <div>
            <div>
              <span>Price for Brocker</span>
              <input value={bidPrice} onChange={changeBidPrice} />
              <span>Price per mile</span>
              <input value={priceKmValue(bidPriceKm)} onChange={() => {}} />
            </div>
            <div>
              <span>Price for Driver</span>
              <input value={driverPrice} onChange={changeDriverPrice} />
              <span>Price per mile</span>
              <input value={priceKmValue(driverPriceKm)} onChange={() => {}} />
            </div>
          </div>
          <p>{percentValue()}</p>
        </div>
        <div>
          <textarea type='textarea' value={props.driver ? str : ''} onChange={changeMail} />
          <div>
            <button onClick={handleSendMail}>PLACE BID</button>
            <button>CLOSE</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(state => ({data: dive`${state}promise.sendMail.payload`, manager: dive`${state}promise.profile.payload.data`, order: dive`${state}promise.externalOne.payload.data`}), {sendMail: actionSendMail})(ConfigOrder)