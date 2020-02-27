import React, { useState, useEffect} from 'react'
import { connect } from 'react-redux'
import Modal from '../../components/modal'
import Preloader from '../../components/preloader'
import { dive } from '../../functions'
import history from '../../routing'
import { actionGetStakes } from '../../redux/actions'
import InfiniteScroll from 'react-infinite-scroll-component'

const Bids = (props) => {
  let [offset, setOffset] = useState(0)
  const [items, setItems] = useState([])
  let [hasMore] = useState(true)

  const fetchMoreData = () => {
    setOffset(offset += 50)
    console.log(offset)
    props.bids({offset: offset})
  }

  const handleClassName = (bid) => {
    if (bid.status === 'Accepted') {
      return 'bids-item bids-item accepted'
    }
    if (bid.status === 'Pending') {
      return 'bids-item bids-item pending'
    }
    if (bid.status === 'Denied') {
      return 'bids-item bids-item denied'
    }
  }

  const handleClick = (bid) => {
    if (bid.status === 'Pending') {
      history.push({
        pathname: `/order_details/${bid.order.id}`,
        state: {
          status: bid.status,
          driver_id: bid.driver.id,
          id: bid.id
        }
      })
    }
  }

  useEffect(() => {
    props.bids({offset})
  }, [])

  useEffect(() => {
    if (props.data) {
      setItems((prevState) => [...prevState, ...props.data])
    }
  }, [props.data])

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
          {console.log(offset)}
        </div>
        {props.data ? (
          <div id="scrollableDiv" >
            <InfiniteScroll
              dataLength={items.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<Preloader/>}
              scrollableTarget='scrollableDiv'>
              {items.map((item) => (
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
              ))}
            </InfiniteScroll>
          </div>
          /*props.data.map((item) => (
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
          ))*/) : <Preloader />}
      </div>
    </Modal>
  )
}

export default connect((state) => ({data: dive`${state}promise.bids.payload.data`}), {bids: actionGetStakes})(Bids)
