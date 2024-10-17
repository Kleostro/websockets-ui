import { WS_MESSAGE_TYPE } from "../../../constants/wsMessage";
import SocketEventStrategy from "./SocketEvent";

class CreateGameEventStrategy extends SocketEventStrategy {
  createEvent(payload: unknown) {
    return {
      type: WS_MESSAGE_TYPE.CREATE_GAME,
      data: JSON.stringify(payload),
      id: 0,
    };
  }
}

export default CreateGameEventStrategy;
