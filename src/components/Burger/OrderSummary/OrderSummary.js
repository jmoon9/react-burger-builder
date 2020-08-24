import React from 'react';
import Aux2 from '../../../hoc2/Aux2/Aux2';
import Button from '../../UI/Button/Button';

const orderSummary = props =>  {
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
        return(
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
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
            <p><strong>Total Price: {props.price}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONFIRM</Button>
        </Aux2>
    );

};

export default orderSummary;