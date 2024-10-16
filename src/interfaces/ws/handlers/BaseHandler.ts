import { WSMessageType } from "../../../constants/wsMessage";
import WebSocket from "ws";

class BaseHandler {
  constructor() {
    if (new.target === BaseHandler) {
      throw new TypeError("Cannot construct BaseHandler instances directly");
    }
  }

  handle(
    data: { type: WSMessageType; data: string; id: number },
    socket: WebSocket
  ) {
    throw new Error("Method 'handle' must be implemented");
  }
}

export default BaseHandler;
