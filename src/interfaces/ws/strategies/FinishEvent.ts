import { WS_MESSAGE_TYPE } from "../../../constants/wsMessage";
import SocketEventStrategy from "./SocketEvent";

class FinishEventStrategy extends SocketEventStrategy {
  createEvent(payload: unknown) {
    return {
      type: WS_MESSAGE_TYPE.FINISH,
      data: JSON.stringify(payload),
      id: 0,
    };
  }
}

export default FinishEventStrategy;
