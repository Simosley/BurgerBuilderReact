import React from 'react'
import Auxaliry from '../../../hoc/Auxaliry'
const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                <span style={{textTransform:'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
        })
    return(
        <Auxaliry>
            <h3>Your Order</h3>
            <p>A delicious burger with the folllowing ingrideints:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout</p>
        </Auxaliry>
    )
}

export default orderSummary