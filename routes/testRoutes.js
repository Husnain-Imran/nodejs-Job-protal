import express  from "express";
import { testPostConroler } from "../controllers/testController.js";
import userAuth from "../middlewars/authMiddleware.js";
const router = express.Router()


router.post('/test',userAuth ,testPostConroler)

export default router 