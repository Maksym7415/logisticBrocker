import React from 'react'
import './App.css'
import { Provider }   from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import store from './app/redux'
import history from './app/routing'
import Authorization from './app/pages/auth'
import OrderDetails from './app/pages/order/orderDetails'
import ExternalOrders from './app/pages/order/allOrders'
import Header from './app/pages/header'
import Bids from './app/pages/bids'
import PrivateRoute from './app/routing/privatRoute'
import Map from './app/map'
import Vehicles from './app/pages/vehicles'
import Pagination from './app/components/pagination'

function App() {
  return (
    <Provider store= {store}>
      <Router history= {history}>
        <div className='App'>
          <Header />
          <Switch>
            <Route path= '/login' exact component={Authorization} />
            <Route path= '/map/:coord' exact component={Map} />
            <Route path= '/' exact component={ExternalOrders} />
            <Route path= '/order_details/:id' exact component={OrderDetails} />
            <Route path= '/vehicles' exact component={Vehicles} />
            <Route path= '/pagination' exact component={Pagination} />
            <PrivateRoute fallback={Authorization} path='/bids' exact component={Bids} />
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

export default App;
