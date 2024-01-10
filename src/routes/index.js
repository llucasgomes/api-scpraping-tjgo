import { Router } from 'express'
import { getProcess } from '../controllers/searchprocess.controller.js'

const router = Router()

router.post('/process', getProcess)

export default router