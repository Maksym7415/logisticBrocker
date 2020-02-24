import React, { useEffect } from 'react'

const Map = (props) => {

  useEffect(() => {
    const script = document.createElement('script')
    script.src = process.env.PUBLIC_URL + '/sdk/tomtom.min.js'
    document.body.appendChild(script)
    script.async = true
    script.onload = function () {
      let map = window.tomtom.L.map('map', {
        source: 'vector',
        key: 'T8tULZWO4BffQ98SLWIdIkAUWOECm6DO',
        center: [49.9803506, 36.2522401],
        basePath: '/sdk',
        style: 'night',
        zoom: 15
      })
      console.log(map)
      let marker = window.tomtom.L.marker([49.9803506, 36.2522401], {
        draggable: true
      })
      marker.addTo(map)
      console.log(window.tomtom.L.Handler)
    }
  })

  return (
    <div id='map'> </div>
  )
}

export default Map
