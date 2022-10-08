import { compare } from "bcryptjs";
import JwtClient from "../../../shared/services/JWT";
import AppError from "../../../shared/utils/AppError";
import ICreateSessionDTO from "../dtos/ICreateSessionDTO";
import ILoginDTO from "../dtos/ILoginDTO";
import UserRepository from "../models/repositories/UserRepository";

class LoginService {
  private usersRepository: UserRepository;
  private jwtClient: JwtClient;

  constructor() {
    this.usersRepository = new UserRepository();
    this.jwtClient = new JwtClient();
  }

  public async execute({
    email,
    password,
  }: ILoginDTO): Promise<ICreateSessionDTO> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    if (!user.is_active) {
      throw new AppError("Account is not active.", 400);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const accessToken = this.jwtClient.generateAccessToken({ id: user.id });

    return { access_token: accessToken };
  }
}

export default LoginService;
