import React from 'react'
import './App.css'
import { Provider } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import store from './app/redux'
import history from './app/routing'
import Authorization from './app/pages/auth'
import OrderDetails from './app/pages/order/orderDetails'
import ExternalOrders from './app/pages/order/allOrders'
import Header from './app/pages/header'
import Bids from './app/pages/bids'
import ManagerRoute from './app/routing/managerRoute'
import Map from './app/map'
import Vehicles from './app/pages/vehicles'
import Message from './app/components/messages'
import AdminRoute from './app/routing/adminRouter'
import Access from './app/components/access'
import NotFound from './app/components/notfound'
import AddUser from './app/pages/settings'

function App() {
	return (
		<Provider store={store}>
			<Router history={history}>
				<div className='App'>
					<Header />
					<Switch>
						<Route path='/denied' exact component={Access} />
						<Route path='/login' exact component={Authorization} />
						<ManagerRoute fallback='/login' path='/map/:coord' exact component={Map} />
						<ManagerRoute fallback='/login' path='/' exact component={ExternalOrders} />
						<ManagerRoute fallback='/login' path='/order_details/:id' exact component={OrderDetails} />
						<ManagerRoute fallback='/login' path='/vehicles' exact component={Vehicles} />
						<Route path='/message' exact component={Message} />
						<ManagerRoute fallback='/login' path='/bids' exact component={Bids} />
						<AdminRoute fallback='/' path='/settings' exact component={AddUser} />
						{/* <Route component={NotFound} /> */}
					</Switch>
				</div>
			</Router>
		</Provider>
	)
}

export default App
