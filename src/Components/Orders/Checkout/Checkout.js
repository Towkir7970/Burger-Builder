import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalBody } from 'reactstrap';
import { resetIngredients } from '../../../redux/actionCreators';
import Spinner from '../../Spinner/Spinner';

const mapStateToProps = state =>{
    return{
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        resetIngredients: ()=>dispatch(resetIngredients()),
    }
}

class Checkout extends React.Component{
    state = {
        values: {
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash on Delivery"
        },
        isLoading: false,
        isModalOpen: false,
        modalMsg: "",
    }

    inputChangeHandler = (e)=>{
        this.setState({
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value
            }
        })
    }

    submitHandler = ()=>{
        this.setState({isLoading: true});
        const order = {
            ingredients: this.props.ingredients,
            customer: this.state.values,
            price: this.props.totalPrice,
            orderTime: new Date(),
        }
        axios.post("https://burger-builder-fc9bd-default-rtdb.firebaseio.com/orders.json", order)
        .then(response => {
            if(response.status === 200){
                this.setState({isLoading: false, isModalOpen:true, modalMsg: "Order Placed Successfully"});
                this.props.resetIngredients();
            }else{
                this.setState({isLoading: false, isModalOpen:true, modalMsg: "Something Went Wrong"});
            }
        })
        .catch(err => {
            console.log(err);
            this.setState({isLoading: false, isModalOpen:true, modalMsg: "Something Went Wrong"});
        });
        
    }

    render(){
        let form = (<div>
            <h4 style={{
                    border: "1px solid grey",
                    boxShadow: "1px 1px #888888",
                    borderRadius: "5px",
                    padding: "20px"
                }}>Payment: {this.props.totalPrice} BDT</h4>
                <form style={{
                    border: "1px solid grey",
                    boxShadow: "1px 1px #888888",
                    borderRadius: "5px",
                    padding: "20px"
                }}>
                    <textarea onChange={(e)=>this.inputChangeHandler(e)} name='deliveryAddress' value={this.state.values.deliveryAddress} className='form-control' placeholder='Delivery Address'></textarea>
                    <br/>
                    <input onChange={(e)=>this.inputChangeHandler(e)} name='phone' className='form-control' value={this.state.values.phone} placeholder='Your Phone Number' />
                    <br />
                    <select onChange={(e)=>this.inputChangeHandler(e)} name='paymentType' value={this.state.values.paymentType} className='form-control'>
                        <option value="Cash on Delivery">Cash on Delivery</option>
                        <option value="Bkash">Bkash</option>
                    </select>
                    <br />
                    <Button onClick={this.submitHandler} style={{backgroundColor: "#D70F64"}} className='mr-auto' disabled={!this.props.purchasable}>Place Order</Button>
                    <Link to="/"><Button color='secondary' className='ml-1'>Cancel</Button></Link>
                </form>
        </div>);
        
        return(
            <div>
                {this.state.isLoading ? <Spinner /> : form}
                <Modal isOpen={this.state.isModalOpen}>
                    <ModalBody>
                        <p>{this.state.modalMsg}</p>
                        <Link to="/"><Button color='secondary' className='ml-1'>Close</Button></Link>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);