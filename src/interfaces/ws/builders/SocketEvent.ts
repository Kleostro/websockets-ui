import WebSocket from "ws";
import { WSMessageType } from "../../../constants/wsMessage";
import { socketEventType } from "../factories/SocketEvent";
import { logger } from "../../../utils/logger";
import { COLORS } from "../../../constants/logger";

class SocketEventBuilder {
  private type: WSMessageType;
  private payload: unknown;
  private socket: WebSocket | null;
  private factory: socketEventType;

  constructor(factory: socketEventType, type: WSMessageType) {
    this.factory = factory;
    this.type = type;
    this.payload = {};
    this.socket = null;
  }

  withPayload(payload: unknown) {
    this.payload = payload;
    return this;
  }

  for(socket: WebSocket) {
    this.socket = socket;
    return this;
  }

  emit() {
    logger("SocketEventBuilder", COLORS.blue);

    if (!this.socket) {
      throw new Error(
        "Socket is not set. Use .for(socket) before calling .emit()"
      );
    }

    const event = this.factory.createEvent(this.type, this.payload);

    logger(`Emit event with type: ${this.type}`, COLORS.brightCyan);

    this.socket.send(JSON.stringify(event));
  }
}

export default SocketEventBuilder;
