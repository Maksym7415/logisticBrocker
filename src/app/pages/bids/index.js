import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import Modal from '../../components/modal'
import Preloader from '../../components/preloader'
import { dive } from '../../functions'
import history from '../../routing'
import { actionGetStakes } from '../../redux/actions'
import { actionDeletePromise } from '../../redux/reducers/promiseReducer'

const Bids = (props) => {
	let [items, setItems] = useState([])
	let [offset, setOffset] = useState(0)
	const scroll = useRef(null)


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
		scroll.current.onscroll = () => {
			if (scroll.current.scrollHeight - scroll.current.scrollTop === scroll.current.clientHeight) {
				setOffset(offset += 50)
				props.bids({offset})
				// console.log('bids2')
			}
		}
	}, [scroll.current && scroll.current.scrollHeight])

	useEffect(() => {
		if (!props.oneId) { 
			props.bids({offset})
			// console.log('bids0')
		} else {
			props.bids({driver:props.oneId})
		}
	}, [])

	useEffect(() => {
		// console.log('bids1')
		if (props.data) {
			setItems((prevState) => {
				if (prevState.length !== props.data.length || prevState[0].id !== props.data[0].id) {
					return [...prevState, ...props.data]
				} else {
					return setItems([...props.data])
				}
			})
		}
	}, [props.data])

	/*useEffect(() => {
		return () => props.deletePromise('bids')
	}, [])
*/
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
					{console.log(items)}
				</div>
				<div className='scroll' ref={scroll}>
					{items && items.length !== 0 && items.map((item) => (
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
							<span>{`${item.percent} %`}</span>
							<span>{item.manager.name}</span>
						</div>
					))}
				</div>
			</div>
		</Modal>
	)
}

export default connect((state) => ({data: dive`${state}promise.bids.payload.data`, oneId: dive`${state}synchro.id`}), {bids: actionGetStakes, deletePromise: actionDeletePromise})(Bids)
