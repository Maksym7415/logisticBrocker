import React, { useState ,useEffect } from 'react'
import Preloader from '../../../components/preloader'
import { connect } from 'react-redux'
import { dive } from '../../../functions'
import { actionGetOneExternal } from '../../../redux/actions'
import OrderDrivers from './drivers'
import Modal from '../../../components/modal'

const OrderDetails = (props) => {

	useEffect(() => {
		props.getOrder(props.match.params.id)
	}, [])

	return props.data ?
	 (
		 <Modal show={true} path={('/')} >
			<div className='order-details-container'>
				<div className='order-details'>
					<h3>
						Order #{props.data[0].id}
					</h3>
					<span> Received {props.data[0].createdAt} </span>
					<p> Pick-up at {props.data[0].startAdress} </p>
					<p> Deliver to {props.data[0].finishAdress} </p>
					<span> Miles {props.data[0].distance} </span>
					<span> Pieces {props.data[0].quantity} </span>
					<span> Weight {props.data[0].weight} </span>
					<span> Dims {props.data[0].dimensions} </span>
					<p> Suggested Track Size {props.data[0].vehicleRequirement} </p>
					<p> If you are interested in this load? please contact us:</p>
					<p> {props.data[0].customerName} </p>
					<p> {props.data[0].customerAdress} </p>
					<p> {props.data[0].customerPhone} </p>
				</div>
				<OrderDrivers order={props.match.params.id} />
			</div>
			</Modal>
		) : <Preloader/>
}

export default connect(state => ({data: dive`${state}promise.externalOne.payload.data`}), {getOrder: actionGetOneExternal})(OrderDetails)