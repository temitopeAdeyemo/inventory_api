import { Router } from "express";
import sessionRoutes from "../modules/users/routes/session.routes";
import usersRoutes from "../modules/users/routes/users.routes";

const router = Router();

router.use("/auth", sessionRoutes);
router.use("/users", usersRoutes);

export default router;
