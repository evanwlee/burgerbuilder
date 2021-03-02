import React from 'react';
import classes from './Logo.module.css';
import logoImage from '../../assets/images/burger-logo.png'
const logo = (props) => {
    return(<div className={classes.Logo}>
        <img src={logoImage}/>
    </div>);
};
export default logo;