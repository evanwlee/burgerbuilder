import React from 'react';
import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.module.css';


const controls = [
    {label:'Salad', type:'salad'},
    {label:'Meat', type:'meat'},
    {label:'Bacon', type:'bacon'},
    {label:'Cheese', type:'cheese'}
];

const buildControls = (props) => (
    <div className={classes.buildControls}>
        <p>Current Price: ${props.price}</p>
        { controls.map( crtl => ( 
            <BuildControl key={crtl.label} 
                added={() => props.add(crtl.type)} 
                removed={() => props.remove(crtl.type)} 
                label={crtl.label}
                disabled={props.disabled[crtl.type]}/>
        ))}
        <button className={classes.OrderButton} disabled={!props.purchasable}
        onClick={props.ordering}>ORDER NOW</button>
    </div>
);
export default buildControls;