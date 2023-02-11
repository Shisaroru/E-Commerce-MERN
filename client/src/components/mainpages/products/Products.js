import React, { useContext, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'
import Loading from '../utils/loading/Loading'
import Filter from './Filter'
import Loadmore from './Loadmore'
import ToTopButton from './ToTopButton'
import axios from 'axios'

function Products() {
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const [isAdmin] = state.userAPI.isAdmin
    const addCart = state.userAPI.addCart
    const [token] = state.token
    const [callProductsAPI, setCallProductsAPI] = state.productsAPI.callback
    const [checkAll, setCheckAll] = useState(false)
    const [loading] = state.productsAPI.loading

    const deleteProduct = async (id, cb = false) => {
        try {
            if (cb) {
                await axios.delete(`/api/products/${id}`, {
                    headers: { Authorization: token }
                })
                setCallProductsAPI(!callProductsAPI)
            }
            else if (window.confirm("Are you really want to delete this product ?")) {
                const res = await axios.delete(`/api/products/${id}`, {
                    headers: { Authorization: token }
                })
                alert(res.data.msg)
                setCallProductsAPI(!callProductsAPI)
            }
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const checkedAll = () => {
        const checkList = document.querySelector("#productList").getElementsByTagName('input')
        setCheckAll(!checkAll)
        for (let item of checkList) {
            item.checked = !checkAll
        }
    }

    const deleteAll = async () => {
        if (window.confirm("Are you sure to delete all selected products")) {
            const checkList = document.querySelector("#productList").getElementsByTagName('input')
            for (let item of checkList) {
                if (item.checked === true) deleteProduct(item.value, true)
            }
            setCheckAll(false)
            alert("Deleted all selected products")
        }

    }

    return (
        <div className='min-h-[70vh]'>
            <ToTopButton></ToTopButton>
            {isAdmin &&
                <section className='text-right my-4'>
                    <button className='border border-black p-2 text-center shadow bg-green-300 rounded-md hover:rounded-lg
                     hover:bg-green-500 hover:text-white transition-all'
                        onClick={checkedAll}>{checkAll ? 'Unselect All' : 'Select All'}</button>
                    <button className='border border-black mx-3 p-2 text-center shadow bg-red-400 rounded-md hover:rounded-lg
                     hover:bg-red-600 hover:text-white transition-all'
                        onClick={deleteAll}>Delete Selected</button>
                </section>
            }
            <section className='grid grid-cols-4 my-5'>
                <Filter></Filter>
                {(products.length === 0 && !loading) &&
                    <>
                        <h2 className="font-bold text-2xl col-span-3 m-auto">No product found</h2>
                    </>}
                {loading ? <Loading></Loading>
                    :
                    <section className='grid grid-cols-3 col-start-2 col-end-5 gap-4' id='productList'>
                        {
                            products.map(product => {
                                return <ProductItem key={product._id} product={product}
                                    isAdmin={isAdmin} addCart={addCart} deleteProduct={deleteProduct}></ProductItem>
                            })
                        }
                    </section>
                }
            </section>
            <Loadmore></Loadmore>
        </div>
    );
}

export default Products