import React, { useEffect} from 'react'
import { connect } from 'react-redux'
import Modal from '../../components/modal'
import Preloader from '../../components/preloader'
import { dive } from '../../functions'
import history from '../../routing'

const Bids = (props) => {

  return (
    <Modal clickOpacity={() => history.push('/')} width='90%' height='90%' show={true} >
      <div className='bids-container'>
        <div className='bids-header'>
          <span>Created</span>
          <span>Brokerage</span>
          <span>Pick-up at</span>
          <span>Deliver to</span>
          <span>Unit #</span>
          <span>Miles</span>
          <span>Prices</span>
          <span>Percent</span>
          <span>Dispatcher</span>
        </div> 
        {/*props.data ? 
          props.data.map((item) => (
            <div>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          )) : <Preloader />*/}
      </div>
    </Modal>
  )
}

export default connect((state) => ({data: dive`${state}promise`}))(Bids)