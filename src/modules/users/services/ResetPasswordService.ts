import { bcrypt } from "bcryptjs";
import AppError from "../../../shared/utils/AppError";
import IResetPasswordDTO from "../dtos/IResetPasswordDTO";
import UserRepository from "../models/repositories/UserRepository";
import environment from "../../../config/environment";
import { generateOTP, generateTempId } from "../../../shared/utils/index";
import cache from "../../../shared/services/Redis";
import EmailService from "../../../shared/services/SendGrid"

class ResetPasswordService {
  private usersRepository: UserRepository;


  constructor() {
    this.usersRepository = new UserRepository();

  }

  public async execute({ email,otp,newPassword}: IResetPasswordDTO): Promise<object> {

    let newCache= new cache();
    const cachedData = await newCache.get(`${email}`);
    if (!cachedData) {
      throw new AppError("OTP is expired", 400);
    }
    if (cachedData.otp !== otp) {
      throw new AppError("Invalid OTP", 400);
    }
    const user = await this.usersRepository.findByEmail(cachedData.email);
    if (!user) {
      throw new AppError("User not found", 400);
    }
    const hashedPassword = await bcrypt.hash(newPassword, environment.saltRounds);
    user.password = hashedPassword;
    await this.usersRepository.create(user);
    newCache.delete(`${email}`);

    return {user};


  }
}

export default ResetPasswordService;
