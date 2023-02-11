import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Products from './products/Products'
import Login from './auth/Login'
import Register from './auth/Register'
import About from './about/About'
import Cart from './cart/Cart'
import NotFound from './utils/not_found/NotFound'
import DetailProduct from './detailProduct/DetailProduct'
import OrderHistory from './history/OrderHistory'
import OrderDetail from './history/OrderDetail'
import Categories from './categories/Categories'
import CreateProduct from './createProduct/CreateProduct'
import { GlobalState } from '../../GlobalState'

function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin

    return (
        <Routes>
            <Route path='/' exact element={<Products />} />
            <Route path='/detail/:id' exact element={<DetailProduct />} />
            <Route path='/login' exact element={isLogged ? <Navigate replace to='/' /> : <Login />} />
            <Route path='/register' exact element={isLogged ? <Navigate replace to='/' /> : <Register />} />
            <Route path='/about' exact element={<About />} />
            <Route path='/cart' exact element={<Cart />} />
            <Route path='/history' exact element={isLogged ? <OrderHistory /> : <Navigate replace to='/login' />} />
            <Route path='/history/:id' exact element={isLogged ? <OrderDetail /> : <Navigate replace to='/login' />} />
            <Route path='/category' exact element={isAdmin ? <Categories /> : <Navigate replace to='/login' />} />
            <Route path='/create_product' exact element={isAdmin ? <CreateProduct /> : <Navigate replace to='/login' />} />
            <Route path='/edit_product/:id' exact element={isAdmin ? <CreateProduct /> : <Navigate replace to='/login' />} />

            <Route path='*' exact element={<NotFound />} />
        </Routes>
    );
}

export default Pages