import { v4 as uuid } from "uuid";
import { hashSync } from "bcryptjs";

import environment from "../../config/environment";
import UserRepository from "../../modules/users/models/repositories/UserRepository";

interface IUser {
  id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: string;
  is_active: boolean;
}

const superAdmin: IUser = {
  id: uuid(),
  email: environment.defaultUserEmail,
  password: hashSync(
    environment.defaultUserPassword,
    parseInt(environment.saltRounds)
  ),
  first_name: environment.defaultUserFirstName,
  last_name: environment.defaultUserLastName,
  role: "ADMIN",
  is_active: true,
};

(async () => {
  try {
    const userRepository = new UserRepository();
    const user = await userRepository.findByEmail(environment.defaultUserEmail);
    if (!user) {
      await userRepository.create(superAdmin);
      console.log("Super admin created");
    }
    console.log("Super admin already exists");
  } catch (err: any) {
    console.error(
      "Something went wrong when creating the super admin:\n",
      err.stack
    );
  }
})();
