import React from "react";
import BreadBottom from '../../../assets/images/bottom.jpg';
import Cheese from '../../../assets/images/cheese.jpg';
import Meat from '../../../assets/images/meat.jpg';
import Salad from '../../../assets/images/salad.jpg';
import BreadTop from '../../../assets/images/top.jpg';
import './Ingredient.css';


const Ingredient = (props)=>{
    let ingredient = null;

    switch(props.type){
        case 'bread-bottom':
            ingredient = <div><img src={BreadBottom} alt="Bread Bottom"/></div>
            break;
        case 'bread-top':
            ingredient = <div><img src={BreadTop} alt="Bread Top"/></div>
            break;
        case 'meat':
            ingredient = <div><img src={Meat} alt="Meat"/></div>
            break;
        case 'salad':
            ingredient = <div><img src={Salad} alt="Salad"/></div>
            break;
        case 'cheese':
            ingredient = <div><img src={Cheese} alt="Cheese"/></div>
            break;

        default:
            ingredient = null;
    }

    return(
        <div className="Ingredient">
            {ingredient}
        </div>
    );
}

export default Ingredient;