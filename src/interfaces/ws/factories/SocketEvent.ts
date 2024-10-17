import { WSMessageType } from "../../../constants/wsMessage";
import SocketEventBuilder from "../builders/SocketEvent";
import SocketEventStrategy from "../strategies/SocketEvent";

class SocketEventFactory {
  private strategies: Map<WSMessageType, SocketEventStrategy>;
  constructor() {
    this.strategies = new Map();
  }

  registerStrategy(type: WSMessageType, strategy: SocketEventStrategy) {
    this.strategies.set(type, strategy);
  }

  createEvent(type: WSMessageType, payload: unknown) {
    const strategy = this.strategies.get(type);
    if (!strategy) {
      throw new Error(`No strategy registered for action: ${type}`);
    }
    return strategy.createEvent(payload);
  }

  emit(type: WSMessageType) {
    return new SocketEventBuilder(this, type);
  }
}

export default new SocketEventFactory();

export type socketEventType = SocketEventFactory;
