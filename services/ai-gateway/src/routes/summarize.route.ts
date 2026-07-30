import {Router} from "express";
import {summarizeController} from "../controllers/summarize.controller";

const router = Router();

router.post("/summarize", summarizeController);

export default router;