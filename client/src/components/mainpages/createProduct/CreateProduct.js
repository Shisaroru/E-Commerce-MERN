import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { GlobalState } from '../../../GlobalState'
import { useParams, useNavigate } from 'react-router-dom'
import { FaPlusSquare, FaWindowClose } from 'react-icons/fa'

function CreateProduct() {
    const initState = {
        product_id: '',
        title: '',
        price: 0,
        description: 'Some description',
        content: 'Some content',
        category: '',
    }

    const state = useContext(GlobalState)
    const params = useParams()
    const [product, setProduct] = useState(initState)
    const [products] = state.productsAPI.products
    const [categories] = state.categoriesAPI.categories
    const [image, setImage] = useState(false)
    const [preview, setPreview] = useState(false)
    const [token] = state.token
    const [onEdit, setOnEdit] = useState(false)
    const [callProductsAPI, setCallProductsAPI] = state.productsAPI.callback
    const navigate = useNavigate()

    useEffect(() => {
        if (params.id) {
            setOnEdit(true)
            products.forEach(product => {
                if (product._id === params.id) {
                    setProduct(product)
                    setPreview(product.images)
                }
            })
        }
    }, [params.id, products])

    const handleImg = (e) => {
        e.preventDefault()
        try {
            if (!e.target.files || e.target.files.length === 0) {
                setImage(false)
                setPreview(false)
                alert("File not exist. Please choose an image to upload")
                return
            }
            const file = e.target.files[0]

            if (file.size > 1024 * 1024 * 10) return alert("File must not bigger than 10MB")

            if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/webp' &&
                file.type !== 'image/svg+xml' && file.type !== 'image/gif') return alert("File format error")

            setImage(file)
            setPreview(URL.createObjectURL(file))
        } catch (err) {
            console.log(err);
        }
    }

    const create_product = async (e) => {
        e.preventDefault()
        if (!preview) return alert("Please choose an image")
        const formData = new FormData();
        formData.append('product', image)
        formData.append('product_id', product.product_id)
        formData.append('title', product.title)
        formData.append('price', product.price)
        formData.append('description', product.description)
        formData.append('content', product.content)
        formData.append('category', product.category)

        if (onEdit) {
            await axios.patch(`/api/products/${params.id}`, formData, {
                headers: { Authorization: token }
            })
        }
        else {
            await axios.post('/api/products', formData, {
                headers: {
                    Authorization: token
                }
            })
        }

        setImage(false)
        setPreview(false)
        setProduct(initState)
        setCallProductsAPI(!callProductsAPI)
        onEdit ? alert("Updated product") : alert("Created new product")
        navigate('/', { replace: true })
    }

    const handleChangeInput = e => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
    }

    return (
        <section className='grid grid-cols-2 m-4 gap-x-4'>
            <div className='relative text-center border-4 border-blue-400 rounded-lg p-2 h-[60vh] bg-gray-300'>
                {preview ? (<>
                    <img className='h-full m-auto' src={preview} alt='' />
                    <button className='absolute top-2 right-4 text-red-500 text-5xl hover:text-red-600'
                        onClick={() => {
                            setPreview(false)
                            setImage(false)
                        }}><FaWindowClose /></button>
                </>)
                    :
                    <>
                        <label htmlFor="product">
                            <div className='text-center text-5xl top-1/3 left-40 absolute text-blue-400'>
                                Upload image<FaPlusSquare className='my-5 m-auto cursor-pointer'></FaPlusSquare>
                            </div>
                        </label>
                        <input className='hidden'
                            type="file" name="product" id='product' accept='image/jpeg, image/png, image/webp, image/svg+xml, image/gif'
                            onChange={handleImg} />
                    </>
                }
            </div>
            <form className='grid grid-rows-[7] gap-2'
                onSubmit={create_product}>
                <div className='grid grid-cols-3 grid-rows-3 gap-y-2'>
                    <label htmlFor="product_id">Product ID:</label>
                    <input className='py-1 px-2 w-1/2 col-span-2 border-2 border-black rounded-md'
                        type="text" name='product_id' id='product_id' required disabled={onEdit}
                        value={product.product_id} onChange={handleChangeInput} />

                    <label htmlFor="title">Title:</label>
                    <input className='py-1 px-2 w-1/2 col-span-2 border-2 border-black rounded-md'
                        type="text" name='title' id='title' required
                        value={product.title} onChange={handleChangeInput} />
                    <label htmlFor="price">Price</label>
                    <input className='py-1 px-2 w-1/2 col-span-2 border-2 border-black rounded-md'
                        type="number" name='price' id='price' required
                        value={product.price} onChange={handleChangeInput} />
                </div>

                <label htmlFor="description">Description: (maximum 80 characters)</label>
                <textarea className='py-1 px-2 border-2 border-black rounded-md'
                    type="text" name='description' id='description' required
                    value={product.description} rows='3' maxLength='80' onChange={handleChangeInput} />

                <label htmlFor="content">Content: (maximum 400 characters)</label>
                <textarea className='py-1 px-2 border-2 border-black rounded-md'
                    type="text" name='content' id='content' required
                    value={product.content} rows='3' maxLength='400' onChange={handleChangeInput} />

                <div className='grid grid-cols-2 mt-2'>
                    <label htmlFor="categories">Category:
                        <select className='border-black border p-2 rounded-md mx-4'
                            name="category" id="categories" required onChange={handleChangeInput} value={product.category}>
                            <option value="">Select one</option>
                            {
                                categories.map(category => {
                                    return (
                                        <option value={category.name} key={category._id}>
                                            {category.name}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </label>
                    <button className='border border-black bg-green-300 hover:bg-green-400 hover:text-white transition-all rounded-lg w-1/3 justify-self-center'
                        type="submit">{onEdit ? 'Save' : 'Create'}</button>
                </div>
            </form>
        </section>
    )
}

export default CreateProduct