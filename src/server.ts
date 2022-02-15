require('dotenv').config();
import * as express from "express"
import * as http from 'http'
import * as cors from 'cors'
import * as socketio from 'socket.io'
import * as socket from './socket'
import mongoose from './Database/Mongoose'
import routes from './Routes/index'
import { corsOptions, corsMiddleware } from './Cors/cors'

const port = process.env.PORT || 9000

const app = express()
const server = http.createServer(app)

server.listen(port, () => console.log(`Server running on port ${port}`))

app.use(express.json())

const origins = [
	'http://192.168.0.233:3000',
	'http://localhost:3000',
	'https://sweetie.kylecaprio.dev',
	'https://api.weatherapi.com'
]
app.use(cors(corsOptions(origins)), corsMiddleware)

const router = express.Router()
app.use('/swt', routes(router))

mongoose
	.then(() => console.log('Database: Connected to Mongo'))
	.catch(error => { throw error })

const io = new socketio.Server()
	.attach(server)
	.path('/socket.io')
	.serveClient(false)

socket.initialize(io)

module.exports = app