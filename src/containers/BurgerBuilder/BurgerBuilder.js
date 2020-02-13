import React, { Component } from "react";
import Auxaliry from '../../hoc/Auxaliry'
import Burger from "../../components/Burger/Burger";

class BurgerBuilder extends Component{
    render() {
        return (
            <Auxaliry>
                <Burger />
                <div>Build Controls</div>
            </Auxaliry>
        );
    }
}

export default BurgerBuilder