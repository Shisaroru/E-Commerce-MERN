import model from "../models/userModel.js"
import Payments from "../models/paymentModel.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const userCtrller = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body

            // check if new email already exist
            const checkUser = await model.findOne({ email })

            if (checkUser) {
                return res.status(400).json({ msg: "This email already been used" })
            }
            if (password.length < 6) {
                return res.status(400).json({ msg: "Password need to be at least 6 characters" })
            }

            // Encrypt password
            const passwordHash = await bcrypt.hash(password, 10)

            const newUser = new model({ name, email, password: passwordHash })

            // Save database
            await newUser.save()

            // Create token
            const accessToken = createAccessToken({ id: newUser._id })
            const refreshToken = createRefreshToken({ id: newUser._id })

            // Save token to client cookies
            res.cookie('refreshtoken', refreshToken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 1000 * 60 * 60 * 24 * 5
            })

            res.json({ msg: "Register success" })

        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body

            const user = await model.findOne({ email })
            if (!user) return res.status(400).json({ msg: "Email does not exist" })

            const checkPass = await bcrypt.compare(password, user.password)
            if (!checkPass) return res.status(400).json({ msg: "Wrong password" })

            //
            const accessToken = createAccessToken({ id: user._id })
            const refreshToken = createRefreshToken({ id: user._id })

            res.cookie('refreshtoken', refreshToken, { httpOnly: true, path: "/user/refresh_token", maxAge: 1000 * 60 * 60 * 24 * 5 })

            res.json({ accessToken })
            // res.json({ msg: "Login success" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: "/user/refresh_token" })
            return res.json({ msg: "logout successful" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    // renew access token
    refreshToken: (req, res) => {
        try {
            // read cookies
            const rf_token = req.cookies.refreshtoken
            if (!rf_token) {
                return res.status(400).json({ msg: "Please login or register" })
            }
            // verify token and grant new token
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET,
                (err, user) => {
                    if (err) return res.status(400).json({ msg: "Please login or register" })
                    const accessToken = createAccessToken({ id: user.id })
                    res.json({ user, accessToken })
                })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getUser: async (req, res) => {
        try {
            // req.user define in auth middleware
            const user = await model.findById(req.user.id).select('-password')
            if (!user) return res.status(400).json({ msg: "User does not exist" })

            res.json(user)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    addCart: async (req, res) => {
        try {
            const user = await model.findById(req.user.id)
            if (!user) return res.status(400).json({ msg: "User not exist" })

            await model.findOneAndUpdate({ _id: req.user.id }, {
                cart: req.body.cart
            })

            return res.json({ msg: "Added to cart" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    history: async (req, res) => {
        try {
            const history = await Payments.find({ user_id: req.user.id })

            res.json({ history })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
}

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '5d' })
}

export default userCtrller