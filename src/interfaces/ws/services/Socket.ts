import { WS_MESSAGE_TYPE, WSMessageType } from "./../../../constants/wsMessage";
import BaseHandler from "../handlers/BaseHandler";
import RegHandler from "../handlers/RegHandler";
import WebSocket, { RawData } from "ws";
import { logger } from "../../../utils/logger";
import { COLORS } from "../../../constants/logger";
import CreateRoomHandler from "../handlers/CreateRoomHandler";
import AddUserToRoomHandler from "../handlers/AddUserToRoomHandler";

class SocketService {
  private handlers: { [key in WSMessageType]: BaseHandler | null };
  constructor() {
    this.handlers = {
      [WS_MESSAGE_TYPE.REG]: new RegHandler(),
      [WS_MESSAGE_TYPE.CREATE_ROOM]: new CreateRoomHandler(),
      [WS_MESSAGE_TYPE.UPDATE_ROOM]: null,
      [WS_MESSAGE_TYPE.ADD_USER_TO_ROOM]: new AddUserToRoomHandler(),
    };
  }

  handle(data: RawData, socket: WebSocket) {
    logger("SocketService", COLORS.blue);

    const receivedData = JSON.parse(data.toString());
    const { type } = receivedData;

    logger(`A new message with the type: ${type}`, COLORS.brightCyan);

    const handler = this.handlers[type as WSMessageType];

    if (!handler) {
      logger(`No handler for type: ${type}`, COLORS.red);
      throw new Error(`No handler for type: ${type}`);
    }

    handler.handle(receivedData, socket);
  }
}

export default SocketService;
