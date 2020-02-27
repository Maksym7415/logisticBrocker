import React, { useState ,useEffect } from 'react'
import { connect } from 'react-redux'
import Preloader from '../../../components/preloader'
import { dive } from '../../../functions'
import { actionGetOneExternal } from '../../../redux/actions'
import OrderDrivers from './drivers'
import Modal from '../../../components/modal'
import history from '../../../routing'

const OrderDetails = (props) => {
	let [coord, setCoord] = useState({})
	useEffect(() => {
		props.getOrder(props.match.params.id)
	}, [])

	useEffect(() => {
		if (props.data) {
			setCoord({longitude: props.data.pickup_longitude, latitude: props.data.pickup_latitude})
		}
	}, [props.data])

	return props.data ? (
		<Modal clickOpacity={() => history.push('/')} width='90%' height='90%' show={true} >
			<div className='order-details-container'>
				<div className='order-details'>
					<h3>
						Order #{props.data.id}
					</h3>
					<p style={{color: '#0000ff', cursor: 'pointer'}} onClick={() => coord.longitude && coord.latitude && history.push(`/map/${JSON.stringify(coord)}`)} >View on map</p>
					<div>
						<span> <b>Received</b> {props.data.received} </span>
						<p> <b>Pick-up at</b> {props.data.pickup} </p>
						<p> <b>Deliver to</b> {props.data.deliver} </p>
						<p> <b>Miles</b> {props.data.earth_miles} </p>
						<p> <b>Pieces</b>  </p>
						<p> <b>Weight</b> {props.data.weight} </p>
						<p> <b>Dims</b> {`${props.data.width}x${props.data.length}x${props.data.height}`} </p>
						<p> <b>Suggested Track Size</b> </p>
						<div>
							<p> <b>If you are interested in this load - please contact us:</b></p>
							<p> {props.data.broker.name} </p>
							<p> {props.data.broker.phone} </p>
							<p> {props.data.broker.email} </p>
						</div>
					</div>
				</div>
		 	<OrderDrivers order={props.data} orderStatus={dive`${history}location.state`} />
  		</div>
		</Modal> 
  ) : <Preloader/>
}

export default connect(state => ({data: dive`${state}promise.externalOne.payload.data`}), {getOrder: actionGetOneExternal})(OrderDetails)
