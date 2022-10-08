import bcrypt from "bcryptjs";
import AppError from "../../../shared/utils/AppError";
import IChangePasswordDTO from "../dtos/IChangePasswordDTO";
import UserRepository from "../models/repositories/UserRepository";
import environment from "../../../config/environment";

class ChangePasswordService {
  private usersRepository: UserRepository;

  constructor() {
    this.usersRepository = new UserRepository();
  }

  public async execute({
    old_password,
    new_password,
    userId,
  }: IChangePasswordDTO): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError("Unauthorized", 401);
    }

    if (!user.is_active) {
      throw new AppError("Account is not active.", 400);
    }

    const passwordMatched = await bcrypt.compare(old_password, user.password);

    if (!passwordMatched) {
      throw new AppError("Incorrect password.", 400);
    }

    user.password = await bcrypt.hash(new_password, environment.saltRounds);

    await this.usersRepository.save(user);
  }
}

export default ChangePasswordService;
