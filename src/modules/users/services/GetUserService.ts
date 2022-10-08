import AppError from "../../../shared/utils/AppError";
import UserRepository from "../models/repositories/UserRepository";

class GetUserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async execute(userId: string) {
    const user = await this.userRepository.findOne({ id: userId });
    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }
}

export default GetUserService;
