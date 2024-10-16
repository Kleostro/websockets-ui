import UserService from "../../../app/services/UserService";
import { WSMessageType } from "../../../constants/wsMessage";
import SocketEventFactory from "../factories/SocketEvent";
import WebSocket from "ws";
import BaseHandler from "./BaseHandler";
import { logger } from "../../../utils/logger";
import { COLORS } from "../../../constants/logger";

class RegHandler extends BaseHandler {
  private userService = new UserService();

  handle(
    data: { type: WSMessageType; data: string; id: number },
    socket: WebSocket
  ) {
    logger("RegHandler", COLORS.blue);

    const parsedData = JSON.parse(data.data);

    const user = this.userService.createUser(
      parsedData.name,
      parsedData.password
    );

    SocketEventFactory.emit(data.type).for(socket).withPayload(user).emit();
  }
}

export default RegHandler;
