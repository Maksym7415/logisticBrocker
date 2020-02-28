import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import Preloader from '../../../components/preloader'
import { dive } from '../../../functions'
import { actionGetAllExternal } from '../../../redux/actions'
import history from '../../../routing'
import { actionDeletePromise } from '../../../redux/reducers/promiseReducer'

const ExternalOrders = (props) => {
  let [items, setItems] = useState([])
  let [offset, setOffset] = useState(0)
  const div = useRef(null)

  useEffect(() => {
    div.current.onscroll = () => {
      if (div.current.scrollHeight - div.current.scrollTop === div.current.clientHeight) {
				setOffset(offset += 50)
				console.log(1)
        props.externalOrders({offset})
      }
    }
  }, [div.current && div.current.onscroll])

  useEffect(() => {
		props.externalOrders({offset})
		console.log(0)
  }, [])

  useEffect(() => {
    if (props.data) {
      setItems((prevState) => {
        if (prevState.length !== props.data.length || prevState[0].id !== props.data[0].id) {
          console.log(prevState, props.data[0].id)
          console.log(1)
          return [...prevState, ...props.data]
        } else {
          console.log('1-1')
          return setItems([...props.data])
        }
      })
    }
	}, [props.data])
	
	/* useEffect(() => {
    if (props.data) {
      setItems((prevState) => {
        if (prevState.length !== [...prevState, props.data].length) {
          return [...prevState, ...props.data]
        }
			})
			console.log(2)
    }
  }, [props.data]) */

  useEffect(() => {
    return () => props.deletePromise('externalAll')
  }, [])

  const handleRefresh = () => {
    setItems([])
    setOffset(0)
    props.externalOrders({offset})
  }

  return (
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
			<div className='grid-container'>
				<div>
					<span>Received</span>
					<span>Pick-up at</span>
					<span>Deliver to</span>
					<span>Vehicle</span>
					<span>Miles</span>
					<span>Match</span>
					<span>Backrage</span>
				</div>
				<div>
					<span></span>
					<label><i className="fas fa-search"></i><input placeholder='Filter'/></label>
					<label><i className="fas fa-search"></i><input placeholder='Filter'/></label>
					<label><i className="fas fa-search"></i><input placeholder='Filter'/></label>
					<label><i className="fas fa-search"></i><input placeholder='Filter'/></label>
					<label><i className="fas fa-search"></i><input placeholder='Filter'/></label>
					<label><i className="fas fa-search"></i><input placeholder='Filter'/></label>
				</div>
				{console.log(items)}
				<div className='all-orders-scroll' ref={div} >
					{items.length !== null && items.map((item) => (
						<div key={item.id} className='table-data' onClick={() => history.push(`/order_details/${item.id}`)}>
							<span>{item.received}</span>
							<span>{item.pickup}</span>
							<span>{item.deliver}</span>
							<span>{item.air_miles}</span>
							<span>{item.earth_miles}</span>
							<span>some info</span>
							<span>{item.broker && item.broker.name}</span>
						</div>
					))}
				</div>
			</div>
		</div>
  )
}

export default connect((state) => ({data: dive`${state}promise.externalAll.payload.data`}), {externalOrders: actionGetAllExternal, deletePromise: actionDeletePromise})(ExternalOrders)
