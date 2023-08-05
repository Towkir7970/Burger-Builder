import React from 'react';
import Auth from './Auth/Auth';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Header from './Header/Header';
import Checkout from './Orders/Checkout/Checkout';
import Orders from './Orders/Orders';

import { Route, Routes } from 'react-router-dom';


const Main = (props)=>{
    return (
        <div>
            <Header />
            <div className='container'>
                <Routes>
                    <Route path='/orders' element={<Orders />} />
                    <Route path='/checkout' element={<Checkout />} />
                    <Route path='/login' element={<Auth />} />
                    <Route path='/' exact element={<BurgerBuilder />}/>
                </Routes>
            </div>
        </div>
    );
}

export default Main;