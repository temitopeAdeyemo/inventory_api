import { Request, Response } from "express";
import ListUsersService from "../services/ListUsersService";
import CreateUserService from "../services/CreateUserService";
import AcceptInvitationService from "../services/AcceptInvitationService";

class UserController {
  async list(request: Request, response: Response): Promise<Response> {
    const { page, limit, is_active } = request.query;

    const listUsersService = new ListUsersService();

    const users = await listUsersService.execute({
      page: Number(page),
      limit: Number(limit),
      is_active: Boolean(is_active),
    });

    return response.status(200).json({
      success: true,
      message: "Users retrieved",
      data: users,
    });
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { first_name, last_name, email, role } = request.body;

    const createUsrService = new CreateUserService();

    const otp = await createUsrService.execute({
      first_name,
      last_name,
      email,
      role,
    });

    return response.status(200).json({
      success: true,
      message: "Invitation sent",
      data: otp,
    });
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { otp, password } = request.body;

    const acceptInvitationService = new AcceptInvitationService();

    await acceptInvitationService.execute({
      id,
      otp,
      password,
    });

    return response.status(200).json({
      success: true,
      message: "Invitation accepted",
    });
  }
}

export default UserController;
