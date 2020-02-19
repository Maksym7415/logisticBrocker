import React, { useState ,useEffect } from 'react'
import Preloader from '../../../components/preloader'
import { connect } from 'react-redux'
import { dive } from '../../../functions'
import { actionGetOneExternal } from '../../../redux/actions'

const OrderDetails = (props) => {

	useEffect(() => {
		props.getOrder(props.match.params.id)
	}, [])

	return props.data ?
	 (
			<div>
				<div>
					<h3>
						Order #{props.data[0].id}
					</h3>
					<p> Received {props.data[0].createdAt} </p>
					<p> Pick-up at {props.data[0].startAdress} </p>
					<p> Deliver to {props.data[0].finishAdress} </p>
					<p> Miles {props.data[0].distance} </p>
					<p> Pieces {props.data[0].quantity} </p>
					<p> Weight {props.data[0].weight} </p>
					<p> Dims {props.data[0].dimensions} </p>
					<p> Suggested Track Size {props.data[0].vehicleRequirement} </p>
					<p> If you are interested in this load? please contact us:</p>
					<p> {props.data[0].customerName} </p>
					<p> {props.data[0].customerAdress} </p>
					<p> {props.data[0].customerPhone} </p>
				</div>
			</div>
		) : <Preloader/>
}

export default connect(state => ({data: dive`${state}promise.externalOne.payload.data`}), {getOrder: actionGetOneExternal})(OrderDetails)