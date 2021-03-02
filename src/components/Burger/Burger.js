import React from 'react';
import Ingredient from './Ingredient/Ingredient'
import classes from './Burger.module.css';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map((key) => {
        return [...Array(props.ingredients[key])].map((_,index)=>{
            return <Ingredient key={key+index} type={key}></Ingredient>
        })
    });

    //un-reduced array...array of empty arrays
    //console.log(transformedIngredients);

    //reduce will return default if element is emtpy
    transformedIngredients = transformedIngredients.reduce((accumulator,el)=>{
        return accumulator.concat(el);
    },[])

   // console.log(transformedIngredients);

    if( transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients.</p>
    }

    return (
        <div className={classes.Burger}>
            <Ingredient type="bread-top" />
            {transformedIngredients}
            <Ingredient type="bread-bottom" />
        </div>
    );
};
export default burger;