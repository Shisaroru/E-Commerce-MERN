import React, { useState, useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import { FaCheckSquare } from 'react-icons/fa'
import axios from 'axios'

function Categories() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories
    const [category, setCategory] = useState('')
    const [token] = state.token
    const [callAPI, setCallAPI] = state.categoriesAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')

    const updateCategories = async (e) => {
        e.preventDefault()
        try {
            if (onEdit) {
                const res = await axios.patch(`/api/category/${id}`, { name: category }, {
                    headers: { Authorization: token }
                })

                alert(res.data.msg)
            }
            else {

                const res = await axios.post('/api/category', { name: category }, {
                    headers: { Authorization: token }
                })

                alert(res.data.msg)
            }
            setCategory('')
            setCallAPI(!callAPI)
            setOnEdit(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const editCategory = (id, name) => {
        setID(id)
        setCategory(name)
        setOnEdit(true)
    }

    const deleteCategory = async (id) => {
        try {
            const res = await axios.delete(`/api/category/${id}`, {
                headers: { Authorization: token }
            })

            alert(res.data.msg)
            setCallAPI(!callAPI)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <section className='grid grid-cols-2 w-2/3 gap-2 m-auto my-4 justify-items-center min-h-[70vh]'>
            <form onSubmit={updateCategories}>
                <label htmlFor="category">Category:</label>
                <input className='py-1 px-2 mx-2 border-2 border-black rounded-md'
                    type="text" id='category' name='category' value={category} required
                    onChange={e => { setCategory(e.target.value) }} />

                <button className='align-middle' type='submit'><FaCheckSquare className='text-green-400 text-3xl hover:text-green-500'></FaCheckSquare></button>
            </form>
            <ul className='bg-blue-200 rounded-md p-3'>
                <h4 className='font-bold uppercase text-center'>Categories list</h4>
                {
                    categories.map(category => {
                        return (
                            <li className='bg-white rounded-lg p-2 hover:bg-gray-200 my-3 grid grid-cols-3 items-center'
                                key={category._id}>{category.name}
                                <button className='mx-2 p-1 border border-black rounded-md hover:rounded-lg text-center shadow bg-orange-300
                                                    hover:bg-orange-500 hover:text-white transition-all'
                                    onClick={() => editCategory(category._id, category.name)}>Edit</button>
                                <button className='mx-2 p-1 border border-black rounded-md hover:rounded-lg text-center shadow bg-red-400
                                                    hover:bg-red-600 hover:text-white transition-all'
                                    onClick={() => deleteCategory(category._id)}>Delete</button>
                            </li>
                        )
                    })
                }
            </ul>
        </section>
    )
}

export default Categories