// const express = require("express")
// api documentation

import swaggerDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import  express  from "express"

import 'express-async-errors'

import dotenv from "dotenv"

import colors from 'colors'

import cors from 'cors'

import morgan from 'morgan'

import helmet from "helmet"

import xss from "xss-clean"

import mongoSanatize from 'express-mongo-sanitize'

import testRoutes from './routes/testRoutes.js'

import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import jobRoutes from './routes/jobRoutes.js'
import connectDb from "./config/DB.js"
import errorMiddleware from "./middlewars/errorMiddleWare.js"





// config env

dotenv.config()

connectDb()

// swagger config 
//api options

const options =
{

    definition :
    {
        openapi:'3.0.0',
        info:
        {
            title:"job portal application",
            description:"node express js job portal application"
        },
        servers:
        [
            {
               url:"http://localhost:8080"
            }
        ]
    },
    apis:["./routes/*.js"]
}

const  spec = swaggerDoc(options)
const app = express()

app.use(helmet())
app.use(xss())
app.use(mongoSanatize())
app.use(express.json())

app.use(cors())

app.use(morgan("dev"))

app.use('/api/v1/test',testRoutes)
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/job',jobRoutes)

app.use("/api-doc",swaggerUi.serve,swaggerUi.setup(spec))
app.use(errorMiddleware)


const PORT = process.env.PORT
const DEV_MODE= process.env.DEV_MOD

app.listen(PORT,()=>
{
    console.log(`node serve is  in ${process.env.DEV_MOD} running on http://localhost:${PORT} `.gray)
})