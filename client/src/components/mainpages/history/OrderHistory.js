import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'
import { FaCheckSquare, FaWindowClose } from 'react-icons/fa'

function OrderHistory() {
    const state = useContext(GlobalState)
    const [history] = state.userAPI.history
    return (
        <section className='m-4 min-h-[70vh]'>
            <h4 className='font-bold text-3xl mb-3 text-center'>You have {history.length} order history</h4>
            <table className='border border-black m-auto bg-white'>
                <thead>
                    <tr>
                        <th className='border border-black p-3'>Payment ID</th>
                        <th className='border border-black p-3'>Date of Purchased</th>
                        <th className="border border-black p-3">Delivery</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        history.map(item => {
                            return (
                                <tr key={item._id}>
                                    <td className='border border-black p-3'>{item.paymentID}</td>
                                    <td className='border border-black p-3'>{new Date(item.createdAt).toString()}</td>
                                    <td className="border border-black p-3 text-2xl">{item.status ?
                                        <FaCheckSquare className='text-green-500 m-auto'></FaCheckSquare> :
                                        <FaWindowClose className='text-red-500 m-auto'></FaWindowClose>}
                                    </td>
                                    <td className='border border-black p-3'>
                                        <Link className='bg-green-200 rounded-md p-2 hover:bg-green-300'
                                            to={`/history/${item._id}`}>View</Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </section>
    )
}

export default OrderHistory