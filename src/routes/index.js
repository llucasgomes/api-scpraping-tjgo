import { Router } from "express";
import { getProcess } from "../controllers/searchprocess.controller.js";

const router = Router();


router.post("/number_process", getProcess);


export default router;