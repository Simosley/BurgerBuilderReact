import React, { Component } from "react";
import { connect } from 'react-redux'

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Auxaliry from "../../hoc/Auxaliry/Auxaliry";
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actionTypes from '../../store/actions'


class BurgerBuilder extends Component{
    state = {
        purchasing:false,
        loading:false,
        error:false
    }
    componentDidMount() {
        // axios.get('https://react-my-burger-a307a.firebaseio.com/ingredients.json')
        //     .then(res => {
        //         this.setState({ingredients:res.data})
        //     })
        //     .catch(error => {
        //         this.setState({error:true})
        //     })
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
       
        let burger =this.state.error ? <p>Ingrediencts cant be loaded</p> : <Spinner/>
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
        if(this.state.loading){
            orderSummary= <Spinner/>
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
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios))