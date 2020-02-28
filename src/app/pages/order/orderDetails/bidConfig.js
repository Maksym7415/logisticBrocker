import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { dive } from '../../../functions'
import { actionSendMail, actionChangeStake, actionPlaceBid } from '../../../redux/actions'
import history from '../../../routing'
import { actionDeletePromise } from '../../../redux/reducers/promiseReducer'

const ConfigOrder = (props) => {
  let [driver, setDriver] = useState()
  let [order] = useState(props.order)
  let [bidPrice, setBidPrice] = useState(order.price)
  let [bidPriceKm, setBidPriceKm] = useState(bidPrice / order.earth_miles)
  let [driverPrice, setDriverPrice] = useState('')
  let [mail, setMail] = useState('')
  let [driverPriceKm, setDriverPriceKm] = useState('')

  let str = (`
  ${bidPrice} all in
  115 miles out
  Time to pickup: 2h 1min
  ${driver && driver.vehicle && driver.vehicle.model}

  We appreciate your buisness
  `)

  const mailParams = {
    from: 'danb41886@gmail.com',
    to: 'popovmaksim7415@gmail.com',
    text: str,
    author: {
      name: props.manager && props.manager.name,
      mail: dive`${props.manager}user.email`
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

  const changeDriverPrice = (e) => {
    setDriverPrice(e.target.value)
    setDriverPriceKm(e.target.value / order.earth_miles)
  }

  const changeBidPrice = (e) => {
    setBidPrice(e.target.value)
    setBidPriceKm(e.target.value / order.earth_miles)
  }

  const percentValue = () => {
    if (isNaN(Math.floor((bidPrice - driverPrice) / driverPrice * 100))) {
      return '-- '
    }
    if (Math.floor((bidPrice - driverPrice)/driverPrice * 100) === Infinity) {
      return '-- '
    }
    return Math.floor((bidPrice - driverPrice) / driverPrice * 100)
  }

  const handlePlaceBid = () => {
    if (driver) {
      props.sendMail(mailParams)
    }
  }

  const handleCloseBid = () => history.push('/')

  const acceptStake = () => props.changeStatus({status: 'Accepted', id: props.stake && props.stake.id})

  const rejectStake = () => props.changeStatus({status: 'Denied', id: props.stake && props.stake.id})

  useEffect(() => {
    if (props.mail === 'RESOLVED') {
      props.placeBid({
        driver_price: driverPrice,
        broker_price: bidPrice,
        percent: percentValue(),
        driver_id: driver.id,
        order_id: order.id,
        manager_id: props.manager.id,
      })
      props.deletePromise('sendMail')
    }
  }, [props.mail])

  useEffect(() => {
    if (props.driver && props.driver[0] && props.driver[0].price) {
      setDriverPriceKm(props.driver[0].price)
      setDriverPrice(props.driver[0].price * order.earth_miles)
      setDriver(props.driver[0])
    }
  }, [props.driver])

  useEffect(() => {
    if (props.bid === 'OK') {
      props.deletePromise('placeBid')
      history.push({
        pathname: '/message',
        state: {
          message: 'Bid added succesfully'
        }
      })
    }
  }, [props.bid])

  useEffect(() => {
    if (props.stakeStatus) {
      history.push({
        pathname: '/message',
        state: {
          message: props.stakeStatus
        }
      })
    }
  }, [props.stakeStatus])

  return (
    <div style={props.display} className='order-configuration'>
      <h3>
        Broker email
        <i>{order.broker.email}</i>
      </h3>
      <div>
        <div>
          <p>
            Bid placement (
            {order.earth_miles}
            mi)
          </p>
          <div>
            <div>
              <span>Price for Brocker</span>
              <input value={bidPrice} onChange={changeBidPrice} />
              <span>Price per mile</span>
              <input value={priceKmValue(bidPriceKm)} onChange={() => {}} />
            </div>
            <div>
              <span>Price for Driver</span>
              <input value={props.status !== false ? driverPrice : ''} onChange={changeDriverPrice} />
              <span>Price per mile</span>
              <input value={priceKmValue(props.status !== false ? driverPriceKm : '')} onChange={() => {}} />
            </div>
          </div>
          <p>{props.status !== false ? percentValue() + '%' : '-- %'}</p>
        </div>
        <div>
          <textarea type='textarea' value={props.status === false || props.bid === 'OK' ? '' : str} onChange={changeMail} />
          {console.log(props.stakeStatus)}
          {!props.stake ? (
            <div className='place-bid-buttons'>
              <button onClick={handlePlaceBid}>PLACE BID</button>
              <button onClick={handleCloseBid}>CLOSE</button>
            </div>
          ) : (
            <div className='change-bid-buttons'>
              <button onClick={acceptStake}>ACCEPT</button>
              <button onClick={rejectStake}>REJECT</button>
              <button onClick={handleCloseBid}>CLOSE</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default connect((state) => ({
  data: dive`${state}promise.sendMail.payload`,
  manager: dive`${state}promise.profile.payload.data`,
  order: dive`${state}promise.externalOne.payload.data`,
  bid: dive`${state}promise.placeBid.payload.data`,
  mail: dive`${state}promise.sendMail.status`,
  stakeStatus: dive`${state}promise.changeStake.payload.data`
  }),
  {sendMail: actionSendMail,
  placeBid: actionPlaceBid,
  deletePromise: actionDeletePromise,
  changeStatus: actionChangeStake
})(ConfigOrder)
