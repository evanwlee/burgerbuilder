import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';


class App extends Component {
  state = {
    inCheckout : false
  }
  render(){
    return (
      <BrowserRouter>
      <div>
        <Layout>
          <Route path="/orders" component={Orders} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/" exact component={BurgerBuilder} />
        </Layout>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
