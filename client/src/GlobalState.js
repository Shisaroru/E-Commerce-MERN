import React, { createContext, useState, useEffect } from "react";
import ProductsAPI from "./api/ProductsAPI";
import UserAPI from "./api/UserAPI";
import CategoriesAPI from "./api/CategoriesAPI";
import axios from "axios";

export const GlobalState = createContext()

export const DataProvider = (props) => {
    const [token, setToken] = useState(false)
    const [logout, setLogout] = useState(false)


    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin')
        if (firstLogin) {
            const refreshToken = async () => {
                const res = await axios.get('/user/refresh_token')
                if (res.status === 200) {
                    setToken(res.data.accessToken)
                } else {
                    setLogout(!logout)
                }
            }
            refreshToken()
            setInterval(refreshToken, 1000 * 60 * 60) // get new accesstoken since the old one expired
        }
    }, [logout])

    const state = {
        token: [token, setToken],
        productsAPI: ProductsAPI(),
        userAPI: UserAPI(token),
        categoriesAPI: CategoriesAPI(),
        logout: [logout, setLogout]
    }

    return (
        <GlobalState.Provider value={state}>
            {props.children}
        </GlobalState.Provider>
    )
}