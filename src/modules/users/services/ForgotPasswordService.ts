import AppError from "../../../shared/utils/AppError";
import IForgotPasswordService from "../dtos/IForgotPasswordDTO";
import UserRepository from "../models/repositories/UserRepository";
import { generateOTP } from "../../../shared/utils/index";
import cache from "../../../shared/services/Redis";
import EmailService from "../../../shared/services/SendGrid";

class ForgotPasswordService {
  private usersRepository: UserRepository;

  constructor() {
    this.usersRepository = new UserRepository();
  }

  public async execute({ email }: IForgotPasswordService): Promise<object> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError("User not found", 401);
    }

    if (!user.is_active) {
      throw new AppError("Account is not active.", 400);
    }

    let otp = generateOTP();
    const cachedData = {
      email: user.email,
      otp,
    };

    let userId = user.id;
    let newCache = new cache();
    newCache.set(userId, cachedData, 60 * 60 * 5);

    let emailService = new EmailService();
    await emailService.sendOTP([email], String(otp), true);

    // await tasks.sendOTP(user.email, otp, true);

    return { userId, otp };
  }
}

export default ForgotPasswordService;
