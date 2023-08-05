import React from "react";
import { Link } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Burger from "./Burger/Burger";
import Controls from "./Controls/Controls";
import Summary from "./Summary/Summary";

import { connect } from 'react-redux';
import { addIngredient, removeIngredient, updatePurchasable } from '../../redux/actionCreators';


const mapStateToProps = (state)=>{
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        addIngredient: (igtype)=> dispatch(addIngredient(igtype)),
        removeIngredient: (igtype)=> dispatch(removeIngredient(igtype)),
        updatePurchasable: ()=>dispatch(updatePurchasable())
    }
}

class BurgerBuilder extends React.Component{
    state = {
        modalOpen: false
    }

    addIngredientHandle = type =>{
        this.props.addIngredient(type);
        this.props.updatePurchasable();
    }

    removeIngredientHandle = type =>{
        this.props.removeIngredient(type);
        this.props.updatePurchasable();
    }

    toggleModal = ()=>{
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }



    render(){
        return(
            <div>
                <div className="d-flex flex-md-row flex-column">
                    <Burger ingredients={this.props.ingredients}/>
                    <Controls purchasable={this.props.purchasable} toggleModal={this.toggleModal} ingredientAdded = {this.addIngredientHandle} ingredientRemoved = {this.removeIngredientHandle} price={this.props.totalPrice} />
                </div>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>Your Order Summary</ModalHeader>
                    <ModalBody>
                        <Summary ingredients={this.props.ingredients} />
                        <h5>Total Price: {this.props.totalPrice.toFixed(0)} BDT</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Link to="/checkout"><Button style={{backgroundColor: "#D70F64"}} >Continue to checkout</Button></Link>
                        <Button style={{backgroundColor: "#D70F64"}} onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (BurgerBuilder);