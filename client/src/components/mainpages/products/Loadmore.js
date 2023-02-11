import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'

function Loadmore() {
    const state = useContext(GlobalState)
    const [page, setPage] = state.productsAPI.page
    const [result] = state.productsAPI.result

    return (
        <section className='text-center my-3'>
            {
                result < (page * 9) ? '' :
                    <button className='p-2 shadow-lg rounded-md bg-blue-400 text-white hover:bg-blue-500 transition-all'
                        onClick={() => { setPage(page + 1) }}>Load more</button>
            }
        </section>
    )
}

export default Loadmore