import React, { useState ,useEffect } from 'react'
import { connect } from 'react-redux'
import Preloader from '../../../components/preloader'
import { dive } from '../../../functions'
import { actionGetOneExternal } from '../../../redux/actions'
import OrderDrivers from './drivers'
import Modal from '../../../components/modal'
import history from '../../../routing'

const OrderDetails = (props) => {

	useEffect(() => {
		props.getOrder(props.match.params.id)
	}, [])

	return props.data ? (
		<Modal clickOpacity={() => history.push('/')} width='90%' height='90%' show={true} >
  		<div className='order-details-container'>
				<div className='order-details'>
					<h3>
						Order #{props.data[0].orders[0].id_order}
					</h3>
					<span> Received {props.data[0].orders[0].received} </span>
					<p> Pick-up at {props.data[0].orders[0].pickup} </p>
					<p> Deliver to {props.data[0].orders[0].deliver} </p>
					<span> Miles {props.data[0].orders[0].earth_miles} </span>
					<span> Pieces  </span>
					<span> Weight {props.data[0].orders[0].weight} </span>
					<span> Dims {`${props.data[0].orders[0].width}x${props.data[0].orders[0].length}x${props.data[0].orders[0].height}`} </span>
					<p> Suggested Track Size </p>
					<p> If you are interested in this load? please contact us:</p>
					<p> {props.data[0].name} </p>
					<p> {props.data[0].fax} </p>
					<p> {props.data[0].email} </p>
				</div>
    	<OrderDrivers />
  		</div>
		</Modal> 
  ) : <Preloader/>
}

export default connect(state => ({data: dive`${state}promise.externalOne.payload.data`}), {getOrder: actionGetOneExternal})(OrderDetails)