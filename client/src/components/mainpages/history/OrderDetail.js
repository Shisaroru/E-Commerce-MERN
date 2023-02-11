import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'

function OrderDetail() {
    const state = useContext(GlobalState)
    const [history] = state.userAPI.history
    const [orderDetail, setOrderDetail] = useState([])
    const [status, setStatus] = useState(false)
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callHistoryAPI, setCallHistoryAPI] = state.userAPI.callback

    const params = useParams()

    useEffect(() => {
        if (params.id) {
            history.forEach(item => {
                if (item._id === params.id) {
                    setOrderDetail(item)
                    setStatus(item.status)
                }
            })
        }
    }, [params.id, history])

    const updateStatus = async (e) => {
        await axios.patch('/api/payment', {
            id: params.id,
            status: e.target.checked
        }, {
            headers: { Authorization: token }
        })
        setStatus(!status)
        setCallHistoryAPI(!callHistoryAPI)
        alert("Updated status")
    }

    if (orderDetail.length === 0) {
        return null
    }
    const { address_line_1, admin_area_1, admin_area_2, country_code } = orderDetail.address.address
    const { total } = orderDetail

    return (
        <>
            <section className="bg-white m-4 rounded-lg">
                <h3 className='font-bold text-xl m-2'>Receiver name: <span className="font-normal">{orderDetail.address.name.full_name}</span></h3>
                <h3 className='font-bold text-xl m-2'>Address: <span className="font-normal">{address_line_1 + ', ' + admin_area_2 + ', ' + admin_area_1 + ', ' + country_code}</span></h3>
                <h3 className='font-bold text-xl m-2'>Total: <span className="font-normal">{total}$</span></h3>
                {
                    isAdmin &&
                    <h3 className="font-bold text-xl m-2">Delivery status
                        <input className='m-2 w-5 h-5 align-middle'
                            type="checkbox" name="status" id="status" checked={status} onChange={updateStatus} />
                    </h3>
                }
            </section>
            {
                orderDetail.cart.map(item => {
                    return (
                        <React.Fragment key={item._id}>
                            <hr className='border-2 border-black' />
                            <div className='grid grid-cols-2 gap-4 mx-4 my-3 bg-white p-2 rounded-lg'>
                                <div className='h-[50vh] w-4/5 justify-self-center border-4 border-blue-400 rounded-lg p-2 bg-gray-200'>
                                    <img className='h-full m-auto' src={item.images} alt={item.title + " image"} />
                                </div>
                                <div className='grid grid-rows-4 items-center'>
                                    <div className='grid grid-cols-4'>
                                        <h3 className='font-bold text-2xl col-span-3'>Product name: {item.title}</h3>
                                        <p className='justify-self-end'>#id: {item.product_id}</p>
                                    </div>
                                    <div className='grid grid-cols-2'>
                                        <p className='text-red-500 font-bold'>Price: {' '}
                                            <span className="font-normal">
                                                {item.price}$ X {item.quantity} = {parseFloat(item.price * item.quantity).toFixed(2)}$
                                            </span>
                                        </p>
                                        <p className='font-bold justify-self-end'>Category: <span className='font-normal'>{item.category}</span></p>
                                    </div>
                                    <div className='row-span-2 self-start'>
                                        <p className='font-bold'>Description:</p>
                                        {item.description}
                                        <p className='font-bold'>Content:</p>
                                        {item.content}
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    )
                })
            }
        </>
    )
}

export default OrderDetail