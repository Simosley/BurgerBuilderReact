import React, { Component } from "react";
import { connect } from 'react-redux'

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Auxaliry from "../../hoc/Auxaliry/Auxaliry";
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import axios from '../../axios-orders'


class BurgerBuilder extends Component{
    state = {
        purchasing:false

    }
    componentDidMount() {
       this.props.onInitIngredients()
    }
    updatePurchaseState (ingredients) {
        
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            } , 0)
            return sum > 0
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing:false})
    }
    purchaseContinueHandler = () => {
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
    }
    purchaseHandler = () => {
        this.setState({purchasing:true})
    }
    
    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for(let key in disabledInfo){
            disabledInfo[key] =disabledInfo[key] <=0
        }
        let orderSummary = null;
       
        let burger =this.props.error ? <p>Ingrediencts cant be loaded</p> : <Spinner/>
        if(this.props.ings) {
            burger = (
                <Auxaliry>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded} 
                        ingredientsRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price}/>
                </Auxaliry>
            )

           orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                purchasedCanceled={this.purchaseCancelHandler}
                purchasedContinued={this.purchaseContinueHandler}
                price={this.props.price}/>
        }
        return (
            <Auxaliry>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
               {burger}
            </Auxaliry>
        );
    }
}
const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),        
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch (actions.purchaseInit())
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios))