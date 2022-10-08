import { Router } from "express";

import loginValidator from "../validators/loginValidator";
import changePasswordValidator from "../validators/changePasswordValidator";

import SessionController from "../controllers/SessionController";
import auth from "../../../shared/middlewares/auth";
import PasswordController from "../controllers/PasswordController";
import emailValidator from "../validators/emailValidator";

const router = Router();

const sessionController = new SessionController();
const passwordController = new PasswordController();

router.post("/login", loginValidator, sessionController.create);

router.get("/me", auth, sessionController.read);

router.patch(
  "/change-password",
  [changePasswordValidator, auth],
  passwordController.update
);

router.post("/forgot-password", emailValidator, passwordController.create);

router.patch(
  "/change-password",
  changePasswordValidator,
  auth,
  passwordController.update
);

router.post("/forgot-password", emailValidator, passwordController.create);

export default router;
