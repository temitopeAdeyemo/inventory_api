import IListUsersDTO from "../dtos/IListUsersDTO";
import IPaginatedUsersResponse from "../dtos/IPaginatedUsersResponse";
import UserRepository from "../models/repositories/UserRepository";

class ListUsersService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute({
    page,
    limit,
    is_active,
  }: IListUsersDTO): Promise<IPaginatedUsersResponse> {
    const users = await this.userRepository.findAll({
      page,
      limit,
      is_active,
    });

    return users;
  }
}

export default ListUsersService;
