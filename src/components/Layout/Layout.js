import React, {Fragment, Component} from 'react';
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
class Layout extends Component {
    state = {
        showSideDrawer : false
    }

    toggleSideDrawerHandler = () => {
       
        //this.setState({showSideDrawer:newState});


        this.setState( (prvState) =>{
            return {showSideDrawer:!prvState.showSideDrawer};
        })
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer:false});
    }
    render(){
        return (<Fragment>
            <Toolbar 
            toggle={this.toggleSideDrawerHandler}/>
            <SideDrawer 
            open={this.state.showSideDrawer} 
            closed={this.sideDrawerClosedHandler}/>
            <main className={classes.MainContent}>
                {this.props.children}
            </main>
        </Fragment>)
    }
};

export default Layout;