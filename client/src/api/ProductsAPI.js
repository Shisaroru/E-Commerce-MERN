import { useState, useEffect } from 'react'
import axios from 'axios'

function ProductsAPI() {
    const [products, setProducts] = useState([])
    const [callProductsAPI, setCallProductsAPI] = useState(false)

    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [result, setResult] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getProducts = async () => {
            const res = await axios.get(`/api/products?limit=${page * 9}&${category}&${sort}&title[regex]=${search}`)
            setProducts(res.data.products)
            setResult(res.data.result)
            setLoading(false)
        }
        getProducts()
    }, [callProductsAPI, page, sort, search, category])

    return {
        products: [products, setProducts],
        callback: [callProductsAPI, setCallProductsAPI],
        category: [category, setCategory],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult],
        loading: [loading, setLoading]
    }
}

export default ProductsAPI