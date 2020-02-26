import React, { useEffect} from 'react'
import { connect } from 'react-redux'
import Modal from '../../components/modal'
import Preloader from '../../components/preloader'
import { dive } from '../../functions'
import history from '../../routing'
import { actionGetStakes } from '../../redux/actions'

const Bids = (props) => {

  const handleClassName = (bid) => {
    if (bid.status === 'Accepted') {
      return 'bids-item accepted'
    }
    if (bid.status === 'Pending') {
      return 'bids-item pending'
    }
    if (bid.status === 'Denied') {
      return 'bids-item denied'
    }
  }

  const handleClick = (bid) => {
    history.push({
      pathname: `/order_details/${bid.order.id}`,
      state: {
        status: bid.status,
        id: bid.driver.id
      }
    })
  }

  useEffect(() => {
    props.bids()
  }, [])

  return (
    <Modal clickOpacity={() => history.push('/')} width='90%' height='90%' show={true} >
      <div className='bids-container'>
        <div className='bids-header'>
          <span>Created</span>
          <span>Brokerage</span>
          <span>Pick-up at</span>
          <span>Deliver to</span>
          <span>Unit #</span>
          <span>Miles</span>
          <span>Prices</span>
          <span>Percent</span>
          <span>Dispatcher</span>
        </div> 
        {props.data ? 
          props.data.map((item) => (
            <div onClick={() => handleClick(item)} className={handleClassName(item)} key={item.id}>
              <span>{item.created}</span>
              <span>{item.order.broker.name}</span>
              <span>{item.order.pickup}</span>
              <span>{item.order.deliver}</span>
              <span>{item.order.id}</span>
              <span>{item.order.earth_miles}</span>
              <span>
                {`${item.broker_price} / ${item.driver_price}`}
              </span>
              <span>{item.percent} %</span>
              <span>{item.manager.name}</span>
            </div>
          )) : <Preloader />}
      </div>
    </Modal>
  )
}

export default connect((state) => ({data: dive`${state}promise.bids.payload.data`}), {bids: actionGetStakes})(Bids)