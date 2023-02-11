import React from 'react'
import { Link } from 'react-router-dom'

function ProductItem({ product, isAdmin, addCart, deleteProduct }) {

    return (
        <div className='border-2 border-blue-300 shadow-md h-96 relative rounded-lg bg-white'>
            <img className='h-1/2 m-auto' src={product.images} alt={product.title + " image"} />
            {isAdmin && <input className='absolute top-1 right-1 w-6 h-6' type='checkbox' name={product._id} value={product._id}></input>}
            <div className='grid grid-rows-4 m-1 pl-1 h-1/2 text-center'>
                <p className='font-bold text-2xl'>{product.title}</p>
                <p className='text-red-500'>${product.price}</p>
                <p className='row-span-2'>{product.description}</p>
                <div className="grid grid-cols-2 my-2 justify-center items-center gap-2">
                    {isAdmin ?
                        <>
                            <Link className='border border-black rounded-md hover:rounded-lg p-2 text-center shadow bg-red-400 w-full
                     hover:bg-red-600 hover:text-white transition-all' to="#"
                                onClick={() => deleteProduct(product._id)}>Delete</Link>
                            <Link className='border border-black rounded-md hover:rounded-lg p-2 text-center shadow bg-orange-300 w-full
                     hover:bg-orange-500 hover:text-white transition-all'
                                to={`/edit_product/${product._id}`}>Edit</Link>
                        </>
                        :
                        <>
                            <Link className='border rounded-md hover:rounded-lg p-2 text-center shadow bg-blue-200
                             hover:bg-blue-300 w-full transition-all' to="#"
                                onClick={() => addCart(product)}>
                                Buy</Link>
                            <Link className='border rounded-md hover:rounded-lg p-2 text-center shadow w-full
                     hover:bg-gray-500 hover:text-white transition-all'
                                to={`/detail/${product._id}`}>View more</Link>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductItem