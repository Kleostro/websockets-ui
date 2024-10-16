import { WS_MESSAGE_TYPE } from "../../../constants/wsMessage";
import SocketEventStrategy from "./SocketEvent";

class AddUserToRoomEventStrategy extends SocketEventStrategy {
  createEvent(payload: unknown) {
    return {
      type: WS_MESSAGE_TYPE.ADD_USER_TO_ROOM,
      data: JSON.stringify(payload),
      id: 0,
    };
  }
}

export default AddUserToRoomEventStrategy;
