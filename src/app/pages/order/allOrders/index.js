import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Preloader from '../../../components/preloader'
import { dive } from '../../../functions'
import { actionGetAllExternal } from '../../../redux/actions'
import { Link } from 'react-router-dom'

const ExternalOrders = (props) => {

	useEffect(() => {
		props.externalOrders()
	}, [])

	return props.data ?
	 (
		<div className='all-orders'>
			<div>
				<div className='header'>
					<span>BETA LOGISTICS</span>
					<span><i class="fas fa-envelope"></i> E-MAIL </span>
					<span><i class="fas fa-dollar-sign"></i> BUIDS </span>
					<span><i class="fas fa-truck"></i> VEHICLES </span>
					<span><i class="fas fa-cog"></i> SETTINGS </span>
					<div>
						<div>
							<span>Name</span>
							<span>role</span>
						</div>
						<img alt='avatar' />
					</div>
				</div>
			</div>
			<div>
				{props.data.map((order) => <Link key={order.id} to={`order_details/${order.id}`}>
					<div>
						{order.createdAt}
					</div>
					<div>
						{order.startAdress}
					</div>
					<div>
						{order.finishAdress}
					</div>
					<div>
						{order.vehicleReuirement}
					</div>
					<div>
						{order.distance}km
					</div>
					<div>
						{order.customerName}
					</div>
				</Link>)}
			</div>
		</div>
		) : <Preloader/>
}

export default connect(state => ({data: dive`${state}promise.externalAll.payload.data`}), {externalOrders: actionGetAllExternal})(ExternalOrders)