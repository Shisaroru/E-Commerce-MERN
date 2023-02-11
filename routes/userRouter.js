import { Router } from 'express'
import controllers from '../controllers/userCtrller.js'
import auth from '../middleware/auth.js'

const router = Router()

router.post('/register', controllers.register)

router.post('/login', controllers.login)

router.get('/logout', controllers.logout)

router.get('/refresh_token', controllers.refreshToken)

router.get('/infor', auth, controllers.getUser)

router.get('/history', auth, controllers.history)

router.patch('/add_cart', auth, controllers.addCart)

export default router;