import React, { useContext, useState, useEffect } from 'react'
import NotFound from '../utils/not_found/NotFound'
import ProductItem from '../utils/productItem/ProductItem'
import { useParams, Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'

function DetailProduct() {
    const state = useContext(GlobalState)
    const params = useParams()
    const [products] = state.productsAPI.products
    const addCart = state.userAPI.addCart
    const [detailProduct, setDetailProduct] = useState([])

    useEffect(() => {
        if (params.id) {
            products.forEach(product => {
                if (product._id === params.id) setDetailProduct(product)
            })
        }
    }, [params.id, products])
    if (detailProduct.length === 0) return <NotFound />
    return (
        <React.Fragment>
            <div className='grid grid-cols-2 gap-4 mx-4 my-3 bg-white p-3 rounded-lg'>
                <div className='h-[50vh] w-4/5 justify-self-center border-4 border-blue-400 rounded-lg p-2 bg-gray-200'>
                    <img className='h-full m-auto' src={detailProduct.images} alt={detailProduct.title + " image"} />
                </div>
                <div className='grid grid-rows-5 items-center'>
                    <div className='grid grid-cols-4'>
                        <h3 className='font-bold text-2xl col-span-3'>Product name: {detailProduct.title}</h3>
                        <p className='justify-self-end'>#id: {detailProduct.product_id}</p>
                    </div>
                    <div className='grid grid-cols-2'>
                        <p className='text-red-500 font-bold'>Price: {' '}
                            <span className="font-normal">
                                {detailProduct.price}$
                            </span>
                        </p>
                        <p className='font-bold justify-self-end'>Category: <span className='font-normal'>{detailProduct.category}</span></p>
                    </div>
                    <div className='row-span-2 self-start'>
                        <p className='font-bold'>Description:</p>
                        {detailProduct.description}
                        <p className='font-bold'>Content:</p>
                        {detailProduct.content}
                    </div>
                    <div className='grid grid-cols-2 items-center'>
                        <p className='font-bold'>Sold: <span className="font-normal">{detailProduct.sold}</span></p>
                        <Link className='text-center rounded-md p-2 py-4 shadow bg-blue-200 hover:bg-blue-300
                         transition-all w-1/3 justify-self-center'
                            to="/cart" onClick={() => addCart(detailProduct)}>
                            <p>Buy now</p></Link>
                    </div>
                </div>
            </div>
            <div className='m-3'>
                <h2 className='text-3xl font-bold'>Related Products</h2>
                <div className='m-4 grid grid-cols-4 gap-2'>
                    {products.map(product => {
                        return ((product.category === detailProduct.category) && (product._id !== detailProduct._id)) ?
                            <ProductItem key={product._id} product={product}></ProductItem> : null
                    })}
                </div>
            </div>
        </React.Fragment>
    )
}

export default DetailProduct