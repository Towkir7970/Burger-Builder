import React from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../../redux/actionCreators';
import Spinner from '../Spinner/Spinner';
import Order from './Order/Order';

const mapStateToProps = state =>{
    return{
        orders: state.orders,
        orderLoading: state.orderLoading,
        orderErr: state.orderErr
    }   
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: ()=> dispatch(fetchOrders()),
    }
}

class Orders extends React.Component{
    componentDidMount(){
        this.props.fetchOrders();
    }
    componentDidUpdate(){
        console.log(this.props.orders);
        
    }
    render(){
        let orders = null;
        if(this.props.orderErr){
            orders = <p>Sorry Failed to Load Orders</p>;
        }else{
            if(this.props.orders.length===0){
                orders = <p>NO Orders</p>;
            }else{
            orders = this.props.orders.map(order=>{
                return <Order order={order} key={order.id}/>
            });
            }
        }
        return(
            <div>
                {this.props.orderLoading? <Spinner /> : orders}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);