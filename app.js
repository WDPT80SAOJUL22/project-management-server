//Pacotes
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import handleError from './error-handling/index.js'
import authRoutes from './routes/auth.routes.js'

//conexão com o DB
import connect from './db/index.js'
connect()

//iniciar o app
const app = express()

// Configura cors para público geral
app.use(cors())

// Configura log de desenvolvimento
app.use(morgan('dev'))

// Configura parse do body
app.use(express.json())

// Rotas

app.use('/', authRoutes)

//configurações de erro
handleError(app)

export default app
