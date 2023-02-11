import { useState, useEffect } from 'react'
import axios from 'axios'


function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])
    const [callHistoryAPI, setCallHistoryAPI] = useState(false)

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infor', {
                        headers: { Authorization: token }
                    })
                    setIsLogged(true)
                    res.data.role === 0 ? setIsAdmin(false) : setIsAdmin(true)

                    setCart(res.data.cart)

                } catch (err) {
                    alert(err.response.data.msg)
                }
            }
            getUser()
        }
    }, [token])

    useEffect(() => {
        if (token) {
            const getHistory = async () => {
                if (isAdmin) {
                    const res = await axios.get('/api/payment', {
                        headers: { Authorization: token }
                    })
                    setHistory(res.data);
                } else {
                    const res = await axios.get('/user/history', {
                        headers: { Authorization: token }
                    })
                    setHistory(res.data.history);
                }
            }
            getHistory()
        }
    }, [token, callHistoryAPI, isAdmin])

    const addCart = async (product) => {
        if (!isLogged) {
            return alert("Please Login first")
        }
        const check = cart.every(item => {
            return item._id !== product._id
        })

        if (check) {
            setCart([...cart, { ...product, quantity: 1 }])
            await axios.patch('/user/add_cart', { cart: [...cart, { ...product, quantity: 1 }] }, {
                headers: { Authorization: token }
            })
            alert("Added to cart")
        } else {
            alert("This product already has been added to cart")
        }
    }

    return (
        {
            isLogged: [isLogged, setIsLogged],
            isAdmin: [isAdmin, setIsAdmin],
            cart: [cart, setCart],
            addCart: addCart,
            history: [history, setHistory],
            callback: [callHistoryAPI, setCallHistoryAPI]
        }
    )
}

export default UserAPI