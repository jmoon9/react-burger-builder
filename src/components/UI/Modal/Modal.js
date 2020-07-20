import React, { Component } from 'react';
import classes from './Modal.css';
import Aux2 from '../../../hoc2/Aux2/Aux2';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component{
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }

    componentDidUpdate() {
        console.log('Modal will update')
    }

    render() {
        return(
            <Aux2>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div className={classes.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)': 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}
            >
                {this.props.children}
            </div>
            </Aux2>
        );
    }
};

export default Modal;