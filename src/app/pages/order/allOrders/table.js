import React from 'react'
import history from '../../../routing'

const Table = (props) =>
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
    {props.data && props.data.map((item)=> { return (
      <div key={item.id} className='table-data' onClick={() => history.push(`/order_details/${item.id}`)}>
        <span>{item.createdAt}</span>
        <span>{item.startAdress}</span>
        <span>{item.finishAdress}</span>
        <span>{item.vehicleRequirement}</span>
        <span>{item.distance}</span>
        <span>some info</span>
        <span>{item.customerName}</span>
      </div>
    )})} 
  </div>

  export default Table