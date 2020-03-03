import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContanctData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
class ContantData extends Component {
    state = {
        name:'',
        email: '',
        address: {
            street: '' ,
            postalCode: ''
        },
        loading:false
    }
    orderHandler = (event) => {
        this.setState({loading: false})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer:{
                name:'Simeon Tsolov',
                address: {
                    street:'Glarus',
                    zipCode:'8231',
                    country: 'Bulgaria'
                },
                email: 'Simo@abv.bg'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(res => {
                this.setState({loading:false})
                this.props.history.push('/')
            })
            .catch(err => {
                this.setState({loading:false})
            }) 
        event.preventDefault()
        console.log(this.props.ingredients);
        
    }
    render() {
        let form = ( <form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
            <input className={classes.Input} type="email" name="email" placeholder="Your email" />
            <input className={classes.Input} type="text" name="street" placeholder="street" />
            <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>);
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContantData
