import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'
import PayPalButtons from './Paypal'
import { FaPlusSquare, FaMinusSquare } from 'react-icons/fa'

function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [callHistoryAPI, setCallHistoryAPI] = state.userAPI.callback
    const [callProductsAPI, setCallProductsAPI] = state.productsAPI.callback
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const getTotal = () => {
            const Total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0)

            setTotal(parseFloat(Total).toFixed(2))
        }
        getTotal()
    }, [cart])

    const updateCart = async (cart) => {
        await axios.patch('/user/add_cart', { cart }, {
            headers: { Authorization: token }
        })
    }

    const increment = (id) => {
        cart.forEach(item => {
            if (item._id === id) item.quantity += 1
        })

        setCart([...cart])
        updateCart(cart)
    }

    const decrement = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
        updateCart(cart)
    }

    const remove = (id) => {
        if (window.confirm("Remove this item from cart ?")) {
            cart.forEach((item, index) => {
                if (item._id === id) {
                    cart.splice(index, 1)
                }
            })
            setCart([...cart])
            updateCart(cart)
        }
    }

    const tranSuccess = async (payment) => {
        const paymentID = payment.purchase_units[0].payments.captures[0].id
        const shipping = payment.purchase_units[0].shipping

        await axios.post('/api/payment', { cart, paymentID, shipping, total }, {
            headers: { Authorization: token }
        })

        setCart([])
        updateCart([])
        alert("Order successful")
        setCallHistoryAPI(!callHistoryAPI)
        setCallProductsAPI(!callProductsAPI)
    }

    if (cart.length === 0) return (
        <h2 className='text-center text-3xl font-bold mt-4 min-h-[70vh]'>Cart Empty</h2>
    )

    return (
        <>
            <div className='grid grid-cols-3 gap-4 my-5 min-h-[70vh]'>
                <div className='col-span-2 border-r-2 border-black'>
                    {
                        cart.map(product => {
                            return (
                                <React.Fragment key={product._id}>
                                    <hr className='border-2 border-black' />
                                    <div className='grid grid-cols-2 gap-4 mx-4 my-3 bg-white p-3 rounded-md'>
                                        <div className='h-[50vh] w-4/5 justify-self-center border-4 border-blue-400 rounded-lg p-2 bg-gray-200'>
                                            <img className='h-full m-auto' src={product.images} alt={product.title + " image"} />
                                        </div>
                                        <div className='grid grid-rows-5 items-center'>
                                            <div className='grid grid-cols-4'>
                                                <h3 className='font-bold text-2xl col-span-3'>Product name: {product.title}</h3>
                                                <p className='justify-self-end'>#id: {product.product_id}</p>
                                            </div>
                                            <div className='grid grid-cols-2'>
                                                <p className='text-red-500 font-bold'>Price: {' '}
                                                    <span className="font-normal">
                                                        {product.price}$ X {product.quantity} = {parseFloat(product.price * product.quantity).toFixed(2)}$
                                                    </span>
                                                </p>
                                                <p className='font-bold justify-self-end'>Category: <span className='font-normal'>{product.category}</span></p>
                                            </div>
                                            <div className='row-span-2 self-start'>
                                                <p className='font-bold'>Description:</p>
                                                {product.description}
                                                <p className='font-bold'>Content:</p>
                                                {product.content}
                                            </div>
                                            <div className='grid grid-cols-3 items-center'>
                                                <p className='font-bold'>Sold: <span className="font-normal">{product.sold}</span></p>
                                                <div className='grid grid-cols-2 justify-items-center items-center col-span-2'>
                                                    <div className='border-2 border-black rounded-lg p-1 py-2 bg-slate-300'>
                                                        <div className='bg-white rounded-lg'>
                                                            <button className='mx-2 text-2xl align-middle'
                                                                onClick={() => decrement(product._id)}><FaMinusSquare /></button>
                                                            {product.quantity}
                                                            <button className='mx-2 text-2xl align-middle'
                                                                onClick={() => increment(product._id)}><FaPlusSquare /></button>
                                                        </div>
                                                    </div>
                                                    <button className='border border-black rounded-md hover:rounded-lg p-2 text-center shadow bg-red-400 w-full
                                                                hover:bg-red-600 hover:text-white transition-all'
                                                        onClick={() => remove(product._id)}>
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        })
                    }
                </div>
                <div className='sticky top-4 h-2/3 justify-self-center w-2/3 bg-white rounded-lg p-4'>
                    <p className='font-bold text-xl'>Total cart: <span className="font-normal float-right">{total}$</span></p>
                    <p className='font-bold text-xl'>Discount <span className="font-normal float-right">0$</span></p>
                    <hr className='border-2 border-black' />
                    <p className='font-bold text-xl mb-4'>Total: <span className="font-normal float-right">{total}$</span></p>
                    <PayPalButtons total={total} tranSuccess={tranSuccess}></PayPalButtons>
                </div>
            </div>
        </>
    );
}

export default Cart