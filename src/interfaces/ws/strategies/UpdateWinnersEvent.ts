import { WS_MESSAGE_TYPE } from "../../../constants/wsMessage";
import SocketEventStrategy from "./SocketEvent";

class UpdateWinnersEventStrategy extends SocketEventStrategy {
  createEvent(payload: unknown) {
    return {
      type: WS_MESSAGE_TYPE.UPDATE_WINNERS,
      data: JSON.stringify(payload),
      id: 0,
    };
  }
}

export default UpdateWinnersEventStrategy;
