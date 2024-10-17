import { WS_MESSAGE_TYPE } from "../../../constants/wsMessage";
import SocketEventStrategy from "./SocketEvent";

class StartGameEventStrategy extends SocketEventStrategy {
  createEvent(payload: unknown) {
    return {
      type: WS_MESSAGE_TYPE.START_GAME,
      data: JSON.stringify(payload),
      id: 0,
    };
  }
}

export default StartGameEventStrategy;
