import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import { FaShoppingCart } from 'react-icons/fa'
import axios from 'axios'

function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    const [logout] = state.logout

    const logoutUser = async () => {
        await axios.get('/user/logout')
        localStorage.removeItem('firstLogin')
        window.location.href = "/"
    }

    if (logout) {
        logoutUser()
    }

    const adminRouter = () => {
        return (
            <>
                <li>
                    <Link className='p-4 hover:text-white transition-all whitespace-nowrap'
                        to="/create_product">CREATE PRODUCT</Link>
                </li>
                <li>
                    <Link className='p-4 hover:text-white transition-all'
                        to="/category">CATEGORIES</Link>
                </li>
            </>
        )
    }

    const loggedRouter = () => {
        return (
            <>
                <li>
                    <Link className='p-4 hover:text-white transition-all'
                        to="/history">HISTORY</Link>
                </li>
            </>
        )
    }

    return (
        <header className='bg-header border-b-2 border-black'>
            <nav className='grid grid-cols-3 items-center'>
                <div className='p-3 ml-2'>
                    <Link to="/"><img className='h-20' src="utils/logo.png" alt="" /></Link>
                </div>
                <ul className='flex items-center justify-self-center p-2 h-full'>
                    <li>
                        <Link className='p-4 hover:text-white transition-all' to="/">PRODUCTS</Link>
                    </li>
                    <li>
                        <Link className='p-4 hover:text-white transition-all' to="/about">ABOUT</Link>
                    </li>
                    {isAdmin && adminRouter()}
                    {isLogged && loggedRouter()}
                </ul>
                <div className='flex flex-row justify-self-end p-2 mr-4 items-center'>
                    {!isAdmin &&
                        <Link className='p-4 text-2xl hover:text-white transition-all relative' to="/cart">
                            <FaShoppingCart alt="Cart icon"></FaShoppingCart>
                            <span className='absolute top-0 right-0 text-sm bg-red-600 rounded-3xl p-1 pr-2 pl-2'>
                                {cart.length}
                            </span>
                        </Link>}
                    {isLogged ?
                        <Link className='p-3 hover:text-white transition-all text-xl'
                            to="/" onClick={logoutUser}>LOG OUT</Link>
                        :
                        <Link className='p-3 hover:text-white transition-all text-xl' to="/login">LOG IN</Link>
                    }
                </div>
            </nav>
            <hr />
        </header>
    )
}

export default Header