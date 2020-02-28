import React from 'react'
import Modal from '../modal'
import history from '../../routing'
import { dive } from '../../functions'

const Message = (props) => (
  <Modal clickOpacity={() => history.push('/')} width='20%' height='10%' show={true} >
    <div className='access-denied'>
      {dive`${history}location.state.message`}
    </div>
  </Modal>
)

export default Message
