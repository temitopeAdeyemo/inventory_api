import { Router } from "express";

import UserController from "../controllers/UserController";
import isSuperStaffOrAdmin from "../../../shared/middlewares/isSuperStaffOrAdmin";
import auth from "../../../shared/middlewares/auth";
import usersListValidator from "../validators/usersListValidator";
import userCreateValidator from "../validators/userCreateValidator";
import acceptInvitationValidator from "../validators/acceptInvitationValidator";

const router = Router();

const userController = new UserController();

router.get(
  "/",
  [usersListValidator, auth, isSuperStaffOrAdmin],
  userController.list
);

router.post(
  "/",
  [auth, isSuperStaffOrAdmin, userCreateValidator],
  userController.create
);

router.patch("/:id", acceptInvitationValidator, userController.update);

export default router;
//
