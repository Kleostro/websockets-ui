import { WS_MESSAGE_TYPE, WSMessageType } from "./../../../constants/wsMessage";
import BaseHandler from "../handlers/BaseHandler";
import RegHandler from "../handlers/RegHandler";
import WebSocket, { RawData } from "ws";
import { logger } from "../../../utils/logger";
import { COLORS } from "../../../constants/logger";

class SocketService {
  private handlers: { [key in WSMessageType]: BaseHandler };
  constructor() {
    this.handlers = {
      [WS_MESSAGE_TYPE.REG]: new RegHandler(),
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
