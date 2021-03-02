import React, { Component } from 'react';
import { Route} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData'
class Checkout extends Component{
    state = {
        ingredients: { 
            salad : 1,
            meat: 1
        },
        totalPrice: 0
    }

    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);

        const ingredients = {};

        let price = 0;

        for (let param of query.entries()){
            if(param[0] === 'price'){
                price = parseInt(param[1]);
            }else{
                ingredients[param[0]] = parseInt(param[1]);
            }
            
        }

        this.setState({ingredients: ingredients,
        totalPrice: price});
    }

    onChechoutCancelHandler = () => {
        this.props.history.goBack();
    }

    onCheckoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        return (
            <div>
                <CheckoutSummary 
                onCheckoutCancel={this.onChechoutCancelHandler} 
                onCheckoutContinue={this.onCheckoutContinueHandler} 
                ingredients={this.state.ingredients} />

                {//<Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
                }
                <Route path={this.props.match.path + '/contact-data'} 
                render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}/>

            </div>
        );
    }

}

export default Checkout;