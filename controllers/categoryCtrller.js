import model from "../models/categoryModel.js"
import Product from '../models/productModel.js'

const categoryCtrller = {
    getCategories: async (req, res) => {
        try {
            const categories = await model.find()
            res.json(categories)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createCategory: async (req, res) => {
        try {
            const { name } = req.body

            const category = await model.findOne({ name })
            if (category)
                return res.status(400).json({ msg: "Category already exist" })

            const newCategory = new model({ name })
            await newCategory.save()

            res.json({ msg: `Created new category name: ${name}` })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const category = await model.findById(req.params.id)
            const product = await Product.findOne({ category: category.name })
            if (product) return res.status(400).json({
                msg: "This category is still being used. Delete all products still using first"
            })
            await model.findByIdAndDelete(req.params.id)
            res.json({ msg: "Deleted successful" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { name } = req.body

            await model.findByIdAndUpdate({ _id: req.params.id }, { name })

            res.json({ msg: "Updated successful" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}


export default categoryCtrller