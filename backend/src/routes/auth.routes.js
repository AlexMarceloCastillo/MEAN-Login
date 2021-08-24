import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import AuthMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/signUp', AuthMiddleware.existUser,AuthController.signup);
router.post('/signIn',AuthController.signin);

export default router;
