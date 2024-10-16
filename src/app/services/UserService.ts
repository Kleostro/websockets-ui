import { ERROR_MESSAGE, ErrorMessageType } from "../../constants/errorMessage";
import { COLORS } from "../../constants/logger";
import User from "../../models/User";
import { logger } from "../../utils/logger";

class UserService {
  private users: Map<string, User>;

  static userService: UserService;
  constructor() {
    this.users = new Map();
  }

  static getInstance() {
    if (!UserService.userService) {
      UserService.userService = new UserService();
    }

    return UserService.userService;
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

    if (this.checkExistUser(name)) {
      const findedUser = Array.from(this.users.values()).find(
        (user) => user.name === name
      )!;
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
    this.users.set(user.id, user);
    return user;
  }

  private checkExistUser(name: string): boolean {
    return Array.from(this.users.values()).some((user) => user.name === name);
  }

  public getUser(id: string): User | undefined {
    return this.users.get(id);
  }
}

export default UserService;
