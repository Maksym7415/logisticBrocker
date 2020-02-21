import React,{useState} from 'react'
import history from '../../routing'

const Modal = (props) => {
  let [show, setShow] = useState(props.show)

  const handleClick = () => {
    setShow(false)
    history.push(props.path)
  }

  return (
    <div className='modal-window' style={show === true ? {display: 'block'} : {display: 'none'}}>
      <div onClick={handleClick} className='modal-opacity'> </div>
      <div className='modal-child'>
        {props.children}
      </div>
    </div>
  )
}

export default Modal