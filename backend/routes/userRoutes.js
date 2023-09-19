import Express from "express";
const router = Express.Router()
import { signup, login, allUsers } from '../controllers/userController.js'
import authenticate from "../middlewares/authMiddleware.js";

// router.route('/').get(allUsers);
router.route('/').get(authenticate, allUsers);

//authorize user
router.route('/signup').post(signup)
router.route('/login').post(login)

export default router;