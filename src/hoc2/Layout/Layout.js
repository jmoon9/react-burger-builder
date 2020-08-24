import React, { useState } from 'react';
import { connect } from 'react-redux';
import Aux2 from '../Aux2/Aux2';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = props => {
    const [ sideDrawerisVisible, setSideDrawerVisible ] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawerVisible(false);
    }
    
    const sideDrawerToggleHandler = () => {
        setSideDrawerVisible(!sideDrawerisVisible);
    }

    return(
        <Aux2>
            <Toolbar 
                isAuth={props.isAuthenticated}
                opened={sideDrawerToggleHandler}/>
            <SideDrawer isAuth={props.isAuthenticated} open={sideDrawerisVisible} closed={sideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux2>
    )

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};

export default connect(mapStateToProps)(layout);