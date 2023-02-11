import Payments from '../models/paymentModel.js'
import Users from '../models/userModel.js'
import Products from '../models/productModel.js'

const paymentCtrller = {
    getPayment: async (req, res) => {
        try {
            const payments = await Payments.find()
            res.json(payments)
        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    createPayment: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('name email')
            if (!user) return res.status(400).json({ msg: 'User does not exist' })

            const { cart, paymentID, shipping, total } = req.body
            const { _id, name, email } = user

            const newPayment = new Payments({
                user_id: _id, name: name, email, cart, paymentID, address: shipping, total
            })

            cart.filter(item => {
                return sold(item._id, item.quantity, item.sold)
            })

            await newPayment.save()
            res.json({ msg: "Payment successful" })

        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    updateStatus: async (req, res) => {
        try {
            const { id, status } = req.body
            await Payments.findByIdAndUpdate(id, { status })
            res.json({ msg: "Updated status" })
        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    }
}

const sold = async (id, quantity, oldSold) => {
    await Products.findOneAndUpdate({ _id: id }, {
        sold: quantity + oldSold
    })
}

export default paymentCtrller