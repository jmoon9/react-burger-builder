import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Aux2 from '../../hoc2/Aux2/Aux2'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc2/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';
import axios from '../../axios-orders';

const burgerBuilder = props => {
    const [ purchasing, setPurchasing ] = useState(false);
    // state = {
    //     purchasing: false,
    //     loading: false,
    //     error: false
    // }

    useEffect(() => {
        props.onInitIngredients();
    }, []) 

    const updatePurchaseState = (ingredients) => {
        
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    }

    const purchaseHandler = () => {
        if(props.isAuthenticated){
            setPurchasing(true)
        } else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }
    
    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    }

    const disabledInfo ={ 
        ...props.ings
    };
    for(let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = props.error? <p>Ingredients can't be loaded!</p> : <Spinner/>;

    if(props.ings !== null){
        burger = (
            <Aux2>
                <Burger ingredients={props.ings}/>
                <BuildControls 
                    isAuth={props.isAuthenticated}
                    ingredientAdded={props.onIngredientAdded} 
                    ingredientRemoved={props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={props.price}
                    purchaseable={updatePurchaseState(props.ings)}
                    ordered={purchaseHandler}/>
            </Aux2>
        );
        orderSummary = <OrderSummary ingredients={props.ings}
            price={props.price.toFixed(2)}
            purchaseCanceled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
        />;
    }

    return (
        <Aux2>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>

            {burger}
        </Aux2>
    );

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));