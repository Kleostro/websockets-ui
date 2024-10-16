import { ERROR_MESSAGE, ErrorMessageType } from "../../constants/errorMessage";
import { COLORS } from "../../constants/logger";
import User from "../../models/User";
import { logger } from "../../utils/logger";

class UserService {
  private users: Map<string, User> = new Map();

  constructor() {
    this.users = new Map();
  }

  public createUser(
    name: string,
    password: string
  ): User | { error: boolean; errorText: ErrorMessageType } {
    logger("UserService", COLORS.blue);
    logger(
      `Attempting to register a user with name: ${name}`,
      COLORS.brightCyan
    );

    if (this.users.has(name)) {
      const findedUser = this.users.get(name)!;
      logger(`User with name: ${name} found`, COLORS.brightRed);

      if (findedUser.password !== password) {
        logger(`Bad credentials`, COLORS.brightYellow);
        return {
          error: true,
          errorText: ERROR_MESSAGE.BAD_CREDENTIALS,
        };
      }
      return findedUser;
    }

    const user = new User(name, password);
    logger(`User with name: ${name} created`, COLORS.brightGreen);
    this.users.set(name, user);
    return user;
  }
}

export default UserService;
