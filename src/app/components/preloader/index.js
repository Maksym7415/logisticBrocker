import React from 'react'

const Preloader = () => {

  return (
    <div className= 'preloader'>
      <img src= {require('./preloader.gif')} alt= {'loading '}/>
    </div>
  )
}

export default Preloader