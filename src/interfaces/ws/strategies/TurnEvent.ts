import { WS_MESSAGE_TYPE } from "../../../constants/wsMessage";
import SocketEventStrategy from "./SocketEvent";

class TurnEventStrategy extends SocketEventStrategy {
  createEvent(payload: unknown) {
    return {
      type: WS_MESSAGE_TYPE.TURN,
      data: JSON.stringify(payload),
      id: 0,
    };
  }
}

export default TurnEventStrategy;
