import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import { FaSearch } from 'react-icons/fa'

function Filter() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories
    const [category, setCategory] = state.productsAPI.category
    const [sort, setSort] = state.productsAPI.sort
    const [search, setSearch] = state.productsAPI.search

    const handleCategory = e => {
        setCategory(e.target.value)
    }

    const handleSearch = e => {
        setSearch(e.target.value.toLowerCase())
    }

    const handleSort = e => {
        setSort(e.target.value)
    }

    return (
        <section className='grid grid-cols-2 h-52 items-center mx-3 sticky top-4 transition-all bg-white p-2 rounded-lg'>
            <FaSearch></FaSearch>
            <input className='bg-gray-200 border-black border p-2 rounded-lg inline' value={search} type="text" placeholder='Search' onChange={handleSearch} />
            <span>Filter: </span>
            <select className='bg-gray-200 border-black border p-2 rounded-md'
                name="category" value={category} onChange={handleCategory}>
                <option value="">All</option>
                {
                    categories.map(item => {
                        return (
                            <option value={"category=" + item.name} key={item._id}>
                                {item.name}
                            </option>
                        )
                    })
                }
            </select>
            <span>Sort by: </span>
            <select className='bg-gray-200 border-black border p-2 rounded-md'
                name="sort" value={sort} onChange={handleSort}>
                <option value="">Newest</option>
                <option value="sort=createdAt">Oldest</option>
                <option value="sort=-sold">Best seller</option>
                <option value="sort=-price">Price: High-Low</option>
                <option value="sort=price">Price: Low-High</option>
            </select>
        </section>
    )
}

export default Filter