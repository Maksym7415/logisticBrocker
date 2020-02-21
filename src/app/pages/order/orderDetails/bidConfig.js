import React, { useState } from 'react'
import { connect } from 'react-redux'
import { dive } from '../../../functions'
import { actionSendMail } from '../../../redux/actions'

const ConfigOrder = (props) => {
  let [mail, setMail] = useState('')
  
  const mailParams = {
    from: 'danb41886@gmail.com',
    to: 'popovmaksim7415@gmail.com',
    text: mail,
    author: {
      name: props.manager && props.manager.login,
      mail: 'danb41886@gmail.com'
    }
  }

  const changeMail = (e) => setMail(mail = e.target.value)
  const handleSendMail = () => props.sendMail(mailParams)

  return (
    <div style={props.display} className='order-configuration'>
      <h3>Broker email {props.email}</h3>
      <div>
        <div>
          <p>Bid placement ({props.distance}mi)</p>
          <div>
            <div>
              <span>Price for Brocker</span>
              <input />
              <span>Price per mile</span>
              <input />
            </div>
            <div>
              <span>Price for Driver</span>
              <input />
              <span>Price per mile</span>
              <input />
            </div>
          </div>
          <p>20%</p>
        </div>
        <div>
          <textarea type='textarea' value={mail} onChange={changeMail} />
          <div>
            <button onClick={handleSendMail}>PLACE BID</button>
            <button>CLOSE</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(state => ({data: dive`${state}promise.sendMail.payload`, manager: dive`${state}promise.profile.payload.data`}), {sendMail: actionSendMail})(ConfigOrder)