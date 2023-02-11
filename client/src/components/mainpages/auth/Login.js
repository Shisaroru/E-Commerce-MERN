import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Login() {

    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const onChangeInput = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const loginSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/user/login', { ...user })
            localStorage.setItem("firstLogin", true)
            window.location.href = "/"
            //redirect('/')
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <section className='min-h-[70vh]'>
            <div className='grid justify-items-center mt-10'>
                <form onSubmit={loginSubmit}
                    className='grid border-2 rounded-xl shadow-md w-1/3 border-blue-200 gap-2 p-3'>
                    <h2 className='font-bold text-2xl'>LOGIN</h2>
                    <label htmlFor="email" className='my-2'>
                        <input type="email" name="email" id="email" required
                            placeholder='Email' value={user.email} onChange={onChangeInput}
                            className="shadow-sm border border-cyan-500 rounded-md w-full p-2" />
                    </label>
                    <label htmlFor="password" className='my-2'>
                        <input type="password" name="password" id="password" required
                            placeholder='Password' value={user.password} onChange={onChangeInput}
                            className="shadow-sm border border-cyan-500 rounded-md w-full p-2" />
                    </label>
                    <div className="grid grid-cols-2 justify-items-center my-1">
                        <button type="submit"
                            className='bg-blue-200 w-1/2 py-2 rounded-md hover:bg-blue-300 transition-all'>Login</button>
                        <Link to='/register'
                            className='w-1/2 py-2 text-center rounded-md bg-green-400 hover:bg-green-600 hover:text-white transition-all'
                        >Register</Link>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Login