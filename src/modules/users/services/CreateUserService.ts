import { hashSync } from "bcryptjs";
import AppError from "../../../shared/utils/AppError";
import ICreateUserRequest from "../dtos/ICreateUserRequest";
import UserRepository from "../models/repositories/UserRepository";
import {
  generatePassword,
  generateOTP,
  minutesToSeconds,
} from "../../../shared/utils";
import Cache from "../../../shared/services/Redis";

class CreateUserService {
  private userRepository: UserRepository;
  private cache: Cache;

  constructor() {
    this.userRepository = new UserRepository();
    this.cache = new Cache();
  }

  async execute({
    first_name,
    last_name,
    email,
    role,
  }: ICreateUserRequest): Promise<any> {
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      throw new AppError("User already exists");
    }

    const password = hashSync(generatePassword());
    const newUser = await this.userRepository.create({
      first_name,
      last_name,
      email,
      role,
      password,
    });

    const otp = generateOTP();
    const cacheExpiry = minutesToSeconds(10);
    this.cache.set(`otp:${newUser.id}`, otp, cacheExpiry);

    return { id: newUser.id, otp };
  }
}

export default CreateUserService;
