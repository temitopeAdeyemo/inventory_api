import AppError from "../../../shared/utils/AppError";
import IAcceptInvitationRequest from "../dtos/IAcceptInvitationRequest";
import UserRepository from "../models/repositories/UserRepository";
import Cache from "../../../shared/services/Redis";
import bycrpt from "bcryptjs";
import environment from "../../../config/environment";

class AcceptInvitationService {
  private userRepository: UserRepository;
  private cache: Cache;

  constructor() {
    this.userRepository = new UserRepository();
    this.cache = new Cache();
  }

  async execute({
    id,
    otp,
    password,
  }: IAcceptInvitationRequest): Promise<void> {
    const cachedOTP = await this.cache.get(`otp:${id}`);
    if (!cachedOTP) {
      throw new AppError("OTP expired");
    }
    if (cachedOTP !== otp) {
      throw new AppError("Invalid OTP");
    }

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError("User not found");
    }

    const hashedPassword = await bycrpt.hash(
      password,
      parseInt(environment.saltRounds)
    );

    user.password = hashedPassword;
    user.is_active = true;
    await this.userRepository.save(user);
  }
}

export default AcceptInvitationService;
