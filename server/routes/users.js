import { Router } from "express";
import { signIn, signUp } from "../controllers/userController.js";

const router = Router();

router.post("/signIn", signIn);
router.post("/signup", signUp);
export default router;
