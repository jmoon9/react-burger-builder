import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from '../CheckoutSummary/CheckoutSummary.css'

const checkoutSummary = (props) => {
    return(
        <div className={classes.CheckoutSummary}>
            <h1>Enjoy your meal!</h1>
            <div style={{width:'100%', display:'inline-block'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
                btnType="Danger"
                clicked={props.checkoutCancel}
            >
                CANCEL</Button>
            <Button 
                btnType="Success"
                clicked={props.checkoutContinue}
            >
                CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;