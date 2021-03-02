import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggele from '../SideDrawer/DrawerToggle/DrawerToggle'
const toolbar = (props) => {
    return(
    <header className={classes.Toolbar}>
        <DrawerToggele clicked={props.toggle}>Menu</DrawerToggele>
        <div className={classes.Logo}><Logo/></div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
        </header>
    );
};

export default toolbar;