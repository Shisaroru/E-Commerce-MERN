import { useState, useEffect } from 'react'
import axios from 'axios'

function CategoriesAPI() {
    const [categories, setCategories] = useState([])
    const [callAPI, setCallAPI] = useState(false)

    useEffect(() => {
        const getCategory = async () => {
            const res = await axios.get('/api/category')
            setCategories(res.data);

        }
        getCategory()

    }, [callAPI])

    return {
        categories: [categories, setCategories],
        callback: [callAPI, setCallAPI]
    }
}

export default CategoriesAPI