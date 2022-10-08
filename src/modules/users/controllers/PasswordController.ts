import { Request, Response } from "express";
import ChangePasswordService from "../services/ChangePasswordService";
import ForgotPasswordService from "../services/ForgotPasswordService";
import ResetPasswordService from "../services/ResetPasswordService";

class PasswordController {
  async update(request: Request, response: Response): Promise<Response> {
    const { old_password, new_password } = request.body;
    const changePasswordService = new ChangePasswordService();

    await changePasswordService.execute({
      old_password,
      new_password,
      userId: request.user,
    });

    return response.json({
      success: true,
      message: "Password Change successful",
    });
  }

  async create(request: Request, response: Response) {
    const { email } = request.body;
    const forgotPasswordService = new ForgotPasswordService();

    await forgotPasswordService.execute({
      email,
    });

    return response.json({
      success: true,
      message: "Password reset link has been sent to your email",
    });
  }

  async reset(request: Request, response: Response) {
    const { otp, newPassword } = request.body;

    const userId = request.params;
    const resetPasswordService = new ResetPasswordService();

    // await resetPasswordService.execute({
    //     email
    // });

    return response.json({
      success: true,
      message: "Password reset link has been sent to your email",
    });
  }
}

export default PasswordController;
