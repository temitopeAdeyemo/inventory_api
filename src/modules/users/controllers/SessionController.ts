import { Request, Response } from "express";
import LoginService from "../services/LoginService";
import GetUserService from "../services/GetUserService";

class SessionController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const loginService = new LoginService();

    const token = await loginService.execute({ email, password });

    return response.json({
      success: true,
      message: "Login successful",
      data: token,
    });
  }

  async read(request: Request, response: Response): Promise<Response> {
    const userId = request.user;
    const getUserService = new GetUserService();

    const user = await getUserService.execute(userId);

    return response.json({
      success: true,
      message: "User profile",
      data: user,
    });
  }
}

export default SessionController;
