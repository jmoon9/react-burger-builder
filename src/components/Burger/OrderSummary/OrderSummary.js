import React, { Component } from 'react';
import Aux2 from '../../../hoc2/Aux2/Aux2';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component  {
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return(
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>
            ) 
        });
        return(
            <Aux2>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONFIRM</Button>
            </Aux2>
        );
    }
};

export default OrderSummary;