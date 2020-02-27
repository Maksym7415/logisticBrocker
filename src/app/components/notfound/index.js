import React from 'react'
import Modal from '../modal'
import history from '../../routing'

const NotFound = (props) => (
  <Modal clickOpacity={() => history.push('/')} width='20%' height='10%' show={true} >
    <div className='access-denied'>
      Page not found!
    </div>
  </Modal>
)

export default NotFound
