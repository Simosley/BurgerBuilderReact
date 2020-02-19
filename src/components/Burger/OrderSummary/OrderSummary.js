import React, {Component} from 'react'
import Auxaliry from '../../../hoc/Auxaliry/Auxaliry'
import Button from '../../UI/Button/Button'
class OrderSummary extends Component {
    componentWillUpdate(){
        console.log('[OrderSummary] will update');
        
    }
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                <span style={{textTransform:'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>
        })
    
    return(
        <Auxaliry>
            <h3>Your Order</h3>
            <p>A delicious burger with the folllowing ingrideints:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout</p>
            <Button btnType="Danger" clicked={this.props.purchasedCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchasedContinued}>CONTINUE</Button>
        </Auxaliry>
     )
    }
}

export default OrderSummary