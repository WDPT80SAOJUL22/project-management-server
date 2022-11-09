//Pacotes
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

//conexão com o DB

//iniciar o app
const app = express()

// Configura cors para público geral
app.use(cors())

// Configura log de desenvolvimento
app.use(morgan('dev'))

// Configura parse do body
app.use(express.json())

//configurações de erro

export default app
