import React from 'react'
import './App.css'
import { Provider }   from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import store from './app/redux'
import history from './app/routing'
import Authiorization from './app/pages/auth'
import OrderDetails from './app/pages/order/orderDetails'
import ExternalOrders from './app/pages/order/allOrders'

function App() {
  return (
    <Provider store= {store}>
      <Router history= {history}>
        <div className="App">
        <Switch>
          <Route path= '/login' exact component= {Authiorization}/>
          <Route path= '/external_orders' exact component= {ExternalOrders}/>
          <Route path= '/order_details/:id' exact component= {OrderDetails}/>
        </Switch>
        </div>
      </Router>
    </Provider>
  
  )
}

export default App;
