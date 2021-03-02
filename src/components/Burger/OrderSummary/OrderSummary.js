import React,{Fragment} from 'react';

import Button from '../../UI/Button/Button'

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients).map(
        (key) => {
            return <li key={key}><span style={{textTransform:'capitalize'}}>{key}</span> : {props.ingredients[key]}</li>
        }
    );

    return(
        <Fragment>
            <h3>Your Order</h3>
            <p>Good Burger with the following:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price: <strong>{props.price}</strong></p>
            <p>Continue to Checkout</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>Continue</Button>
        </Fragment>
    );
};



export default orderSummary;