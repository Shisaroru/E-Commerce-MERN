import { Router } from "express";
import controller from '../controllers/paymentCtrller.js'
import auth from '../middleware/auth.js'
import authAdmin from "../middleware/authAdmin.js";

const router = Router()

router.route('/payment')
    .get(auth, authAdmin, controller.getPayment)
    .post(auth, controller.createPayment)
    .patch(auth, authAdmin, controller.updateStatus)

export default router