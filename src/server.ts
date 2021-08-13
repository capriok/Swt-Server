require('dotenv').config();
import * as express from "express"
import * as cors from 'cors'
import * as swt from './swt.router'
import mongoose from './database/mongoose'
import { corsOptions, corsMiddleware } from './cors/cors'

const app = express()

const port = process.env.PORT || 9000

app.use(express.json())
app.use(cors())

const origins = [undefined, 'http://localhost:3000', process.env.APP_ORIGIN]
app.use(cors(corsOptions(origins)), corsMiddleware)

app.use('/swt', swt.router)

mongoose
	.then(() => console.log('Swt Connected to Mongo.'))
	.catch(error => { throw error })



app.listen(port, () => console.log(`Server running on port ${port}`))

module.exports = app

// https://github.com/hay-bams/med-ts-node

// https://medium.com/swlh/typescript-with-mongoose-and-node-express-24073d51d2ee