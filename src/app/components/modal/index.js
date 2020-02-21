import React,{useState} from 'react'
import history from '../../routing'

const Modal = (props) => {

  return (
    <div className='modal-window' style={props.show === true ? {display: 'block'} : {display: 'none'}}>
        <div onClick={props.clickOpacity} className='modal-opacity'> </div>
        <div className='modal-child' style={{width: props.width, height: props.height}} >
          {props.children}
        </div>
    </div>
  )
}

export default Modal