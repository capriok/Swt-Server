require('dotenv').config();
import * as express from "express"
import * as cors from 'cors'
import mongoose from './Database/Mongoose'
import routes from './Routes/index'
import { corsOptions, corsMiddleware } from '../cors/cors'

const app = express()

const port = process.env.PORT || 9000

app.use(express.json())
app.use(cors())

const origins = [undefined, 'http://localhost:3000', process.env.APP_ORIGIN]
app.use(cors(corsOptions(origins)), corsMiddleware)

const router = express.Router()
app.use('/swt', routes(router))

mongoose
	.then(() => console.log('Swt Connected to Mongo.'))
	.catch(error => { throw error })

app.listen(port, () => console.log(`Server running on port ${port}`))

module.exports = app