import { Router } from "express";
import controllers from "../controllers/categoryCtrller.js";
import auth from "../middleware/auth.js"
import authAdmin from "../middleware/authAdmin.js";

const router = Router()

router.route('/category')
    .get(controllers.getCategories)
    .post(auth, authAdmin, controllers.createCategory)

router.route('/category/:id')
    .delete(auth, authAdmin, controllers.deleteCategory)
    .patch(auth, authAdmin, controllers.updateCategory)


export default router