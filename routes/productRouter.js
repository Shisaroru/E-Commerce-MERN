import { Router } from "express";
import controllers from "../controllers/productCtrller.js"
import multer from "multer";
import auth from "../middleware/auth.js";
import authAdmin from "../middleware/authAdmin.js";

// Set up save path and temp name
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img')
    },
    filename: (req, file, cb) => {
        cb(null, "temp")
    }
})
// Filter before save
const fileFilter = (req, file, cb) => {
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png" && file.mimetype !== "image/svg+xml"
        && file.mimetype !== "image/webp" && file.mimetype !== "image/jpg" && file.mimetype !== "image/gif") {
        cb(new Error("File format error"), false)
    }
    cb(null, true)
}
// Save file - fileSize = 10MB

const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 10 }, fileFilter: fileFilter }).single('product')

const uploadMiddleWare = (req, res, next) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ msg: err.message })
        }
        next()
    })
}

const router = Router()

router.route('/products')
    .get(controllers.getProduct)
    .post(auth, authAdmin, uploadMiddleWare, controllers.createProduct)

router.route('/products/:id')
    .delete(auth, authAdmin, controllers.deleteProduct)
    .patch(auth, authAdmin, uploadMiddleWare, controllers.updateProduct)


export default router