import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Preloader from '../../../components/preloader'
import { dive } from '../../../functions'
import { actionGetAllExternal } from '../../../redux/actions'
import { Link } from 'react-router-dom'
import Table from './table'
import history from '../../../routing'

const ExternalOrders = (props) => {

	useEffect(() => {
		props.externalOrders()
	}, [])

	return props.data ?
	 (
		<div className='all-orders'>
				<div className='controls'>
					<label><input type='checkbox' value='false' onChange={props.onChange} />Some checkbox</label>
					<select>
						<option>All products</option>
					</select>
					<div>
						<i className="fas fa-pause"></i>
						<i className="fas fa-redo"></i>
					</div>
				</div>
			<Table data={props.data} />
		</div>
		) : <Preloader/>
}

export default connect(state => ({data: dive`${state}promise.externalAll.payload.data`}), {externalOrders: actionGetAllExternal})(ExternalOrders)