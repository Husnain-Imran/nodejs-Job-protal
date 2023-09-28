import  express  from "express";
import userAuth from "../middlewars/authMiddleware.js";
import userController from '../controllers/userContoller.js'
const router = express.Router()

router.put('/update-user',userAuth, userController)

export default  router