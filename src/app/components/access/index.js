import React from 'react'
import Modal from '../modal'
import history from '../../routing'

const Access = (props) => (
	<Modal clickOpacity={() => history.push('/')} width='20%' height='10%' show>
		<div className='access-denied'>
			Acces denied!
		</div>
	</Modal>
)

export default Access
