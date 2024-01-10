import cors from 'cors'
import express from 'express'

import routes from './routes/index.js'

const app = express()

app.use(express.json())

app.use(cors())

app.use('/', routes)

app.listen(8000, () => console.log('rodando na porta 8000'))