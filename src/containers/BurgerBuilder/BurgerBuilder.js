import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axInstance from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 1.0,
    meat: 0.2
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {},
        totalPrice: 4.00,
        purchasing: false,
        purchasable: false,
        loading: false
    }

    componentDidMount(){
        console.log(this.props);
        axInstance.get('https://react-my-burger-51c91-default-rtdb.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients : response.data})
        })
        .catch(err => {//add error message on display
        });
    }

    //state manipulation methods
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        const updatedIngredients = { ...this.state.ingredients };

        updatedIngredients[type] = updatedCount;

        let newPrice = this.state.totalPrice;
        if( !isNaN(INGREDIENT_PRICES[type]) ){
            newPrice = INGREDIENT_PRICES[type] + parseFloat(this.state.totalPrice);
            newPrice = parseFloat(Math.round((newPrice + Number.EPSILON) * 100) / 100).toFixed(2)
        }

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchasableStatue(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;


        if (updatedCount >= 0) {
            const updatedIngredients = { ...this.state.ingredients };
            updatedIngredients[type] = updatedCount;

            let newPrice = this.state.totalPrice;
            if( !isNaN(INGREDIENT_PRICES[type]) ){
                newPrice = parseFloat(this.state.totalPrice) - INGREDIENT_PRICES[type];
                newPrice = parseFloat(Math.round((newPrice + Number.EPSILON) * 100) / 100).toFixed(2)
            }
            this.setState({ 
                totalPrice: newPrice, 
                ingredients: updatedIngredients });
            this.updatePurchasableStatue(updatedIngredients);
        }
    }
    updatePurchasableStatue = (ingredients) => {
        // const ingredients = {
        //     ...this.state.ingredients
        // };

        const sum = Object.keys(ingredients).map((key)=>{
            return ingredients[key];
        }).reduce((newSum,element)=>{
            return newSum + element;
        },0);

        this.setState(
            {purchasable: sum > 0}
        )
    }

    purchaseHandler = () =>{
        this.setState({purchasing:true});
    }

    purchaseCancelHandler = () =>{
        this.setState({purchasing:false});

    }

    purchaseContinueHandler = () =>{
        this.setState({loading:true});
       //alert('you continue');


        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' +encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join('&');
       this.props.history.push(
           {pathname:'/checkout',
            search : '?'+queryString});

    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = <Spinner />;

        if (this.state.ingredients){
            burger = (
                <Fragment>
                    <Burger ingredients={this.state.ingredients}></Burger>
                    <BuildControls 
                    add={this.addIngredientHandler} 
                    remove={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordering={this.purchaseHandler}/>
                </Fragment>
            );

            orderSummary = <OrderSummary 
            price={this.state.totalPrice}
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}/>;
        }

        if(this.state.loading){
            orderSummary = <Spinner />;
        }

        return (
            <Fragment>
                <Modal show={this.state.purchasing || this.state.loading} 
                modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}

                </Modal>
               {burger}
            </Fragment>
        );
    }

}

export default withErrorHandler(BurgerBuilder,axInstance);