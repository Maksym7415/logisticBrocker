import React, { useState, useEffect } from 'react'
import Preloader from '../../../../components/preloader'
import history from '../../../../routing'

const Call = (props) => {
  let [coord, setCoord] = useState({})

  const handleMap = () => {
    if (coord.longitude && coord.latitude) {
      history.push(`/map/${JSON.stringify(coord)}`)
    }
  }

  useEffect(() => {
    if (props.data) {
      setCoord({
        longitude: props.data.longitude,
        latitude: props.data.latitude
      })
    }
  }, [props.data])
  
  return props.data ? (
    <div className='call-driver'>
      <div>
        <span><b>Status:</b> {props.data.status}</span>
        <span><b>Name:</b> {props.data.name}</span>
        <span><b>Phone</b>: {props.data.phone}</span>
        <span style={{color: '#0000ff', cursor: 'pointer'}} onClick={handleMap} >View on map</span>
      </div>
    </div>
  ) : <Preloader />
}

export default Call
