import React from 'react';
import Aux2 from '../../hoc/Aux2';
import classes from './Layout.css';

const Layout = ( props ) => (
    <Aux2>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux2>
);

export default Layout;