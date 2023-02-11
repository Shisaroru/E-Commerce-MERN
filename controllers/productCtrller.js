import model from '../models/productModel.js'
import { extname } from "node:path"
import { unlink, rename } from "node:fs/promises"
import { existsSync } from "node:fs";

class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering() {
        const queryObj = { ...this.queryString }

        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(item => delete (queryObj[item]))

        let queryStr = JSON.stringify(queryObj)

        queryStr = queryStr.replace('regex', match => '$' + match)

        this.query.find(JSON.parse(queryStr))

        return this;
    }
    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }
    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit

        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const productCtrller = {
    getProduct: async (req, res) => {
        try {
            const features = new APIfeatures(model.find(), req.query)
                .filtering()
                .sorting()
                .paginating()

            const products = await features.query

            res.json({
                status: 'success',
                result: products.length,
                products: products,
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createProduct: async (req, res) => {
        try {
            // Deleted temp file if exist since multer created it
            const deleteFile = async () => {
                if (existsSync('./public/img/temp')) {
                    await unlink('./public/img/temp')
                }
            }
            let images = ''
            const { product_id, title, price, description, content, category } = req.body

            const product = await model.findOne({ product_id })
            if (product) {
                deleteFile()
                return res.status(400).json({ msg: "This product is already exist" })
            }
            // Upload successful then rename and add file extension
            if (!req.file) {
                deleteFile()
                return res.status(400).json({ msg: "No files were uploaded" })
            }
            images = '/img/' + Date.now() + extname(req.file.originalname)
            await rename('./public/img/temp', './public' + images)


            const newProduct = new model({
                product_id, title: title.toLowerCase(), price, description, content, images, category
            })

            await newProduct.save()
            res.json({ msg: "Created new product" })


        } catch (err) {
            if (existsSync('./public/img/temp')) {
                await unlink('./public/img/temp')
            }
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const query = await model.findByIdAndDelete(req.params.id)
            await unlink('./public' + query.images)
            res.json({ msg: "Deleted product" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { title, price, description, content, category } = req.body
            if (req.file) {
                const images = '/img/' + Date.now() + extname(req.file.originalname)
                await rename('./public/img/temp', './public' + images)
                const query = await model.findOneAndUpdate({ _id: req.params.id }, {
                    title: title.toLowerCase(),
                    price, description, content, images, category
                })
                await unlink('./public' + query.images)
            } else {
                await model.findOneAndUpdate({ _id: req.params.id }, {
                    title: title.toLowerCase(),
                    price, description, content, category
                })
            }
            res.json({ msg: "Updated product" })
        } catch (err) {
            console.log(err.message);
            return res.status(500).json({ msg: err.message })
        }
    }
}

export default productCtrller