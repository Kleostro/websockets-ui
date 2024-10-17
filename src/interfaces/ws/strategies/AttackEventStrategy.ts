import { WS_MESSAGE_TYPE } from "../../../constants/wsMessage";
import SocketEventStrategy from "./SocketEvent";

class AttackEventStrategy extends SocketEventStrategy {
  createEvent(payload: unknown) {
    return {
      type: WS_MESSAGE_TYPE.ATTACK,
      data: JSON.stringify(payload),
      id: 0,
    };
  }
}

export default AttackEventStrategy;
