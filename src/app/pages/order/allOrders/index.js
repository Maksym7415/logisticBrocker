import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Preloader from '../../../components/preloader'
import { dive } from '../../../functions'
import { actionGetAllExternal } from '../../../redux/actions'
import { Link } from 'react-router-dom'
import Table from './table'
import InfiniteScroll from 'react-infinite-scroll-component'
import history from '../../../routing'

const ExternalOrders = (props) => {
	let [offset, setOffset] = useState(0)
  const [items, setItems] = useState([])
	let [hasMore] = useState(true)
	
	const fetchMoreData = () => {
		setOffset(offset += 50)
		console.log(offset)
    props.externalOrders({offset: offset})
	}
	
	useEffect(() => {
    if (props.data) {
      setItems((prevState) => [...prevState, ...props.data])
    }
  }, [props.data])

  useEffect(() => {
    props.externalOrders({offset})
  }, [])

  const handleRefresh = () => {
		setItems([])
		setOffset(0)
		props.externalOrders({offset})
	}

  return props.data ? (
		<div className='all-orders'>
			<div className='controls'>
				<label><input type='checkbox' value='false' onChange={props.onChange} />Some checkbox</label>
				<select>
					<option>All products</option>
				</select>
				<div>
					<i className="fas fa-pause"></i>
					<i onClick={handleRefresh} className="fas fa-redo"></i>
				</div>
			</div>
			{console.log(items)}
			<div id='scrollDivOrders'>
				<InfiniteScroll
					dataLength={items.length}
					next={fetchMoreData}
					hasMore={hasMore}
					// loader={<Preloader/>}
					// scrollableTarget='scrollDivOrders'>
					>
					<Table data={items} />
				</InfiniteScroll>
			</div>
		</div>
  ) : <Preloader />
}

export default connect(state => ({data: dive`${state}promise.externalAll.payload.data`}), {externalOrders: actionGetAllExternal})(ExternalOrders)