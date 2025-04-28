import { Router } from "express";
import { controllers } from "../controllers/controller";
import { validate } from "../middleware/validate.middleware";
import { signupSchema, signinSchema } from "../validation/auth.validation";

const router = Router()

router.post("/signup", validate(signupSchema), (req, res) => controllers.authController.signup(req, res) )
router.post("/signin", validate(signinSchema), (req, res) => controllers.authController.signin(req, res) )

export default router;