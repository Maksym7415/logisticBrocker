import React, { useState, useEffect } from 'react'
import Modal from '../components/modal'
import history from '../routing'

const Map = (props) => {
  let [coordinates] = useState(() => {
    let obj = JSON.parse(props.match.params.coord)
    return [obj.latitude, obj.longitude]
  })

console.log(coordinates)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = process.env.PUBLIC_URL + '/sdk/tomtom.min.js'
    document.body.appendChild(script)
    script.async = true
    script.onload = function () {
      let map = window.tomtom.L.map('map', {
        source: 'vector',
        key: 'T8tULZWO4BffQ98SLWIdIkAUWOECm6DO',
        center: coordinates,
        basePath: '/sdk',
        style: 'main',
        zoom: 15
      })
      let marker = window.tomtom.L.marker(coordinates, {
        draggable: true
      })
      marker.addTo(map)
    }
  }, [])

  return (
    <Modal clickOpacity={() => history.goBack()} width='90%' height='90%' show={true} >
      <div id='map'> </div>
    </Modal>
  )
}

export default Map
