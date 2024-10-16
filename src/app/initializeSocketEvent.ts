import { WS_MESSAGE_TYPE } from "../constants/wsMessage";
import SocketEventFactory from "../interfaces/ws/factories/SocketEvent";
import RegEventStrategy from "../interfaces/ws/strategies/RegEvent";
import UpdateRoomEventStrategy from "../interfaces/ws/strategies/UpdateRoomEvent";
import AddUserToRoomEventStrategy from "../interfaces/ws/strategies/AddUserToRoomEvent";

const initializeSocketEvent = () => {
  SocketEventFactory.registerStrategy(
    WS_MESSAGE_TYPE.REG,
    new RegEventStrategy()
  );

  SocketEventFactory.registerStrategy(
    WS_MESSAGE_TYPE.UPDATE_ROOM,
    new UpdateRoomEventStrategy()
  );

  SocketEventFactory.registerStrategy(
    WS_MESSAGE_TYPE.ADD_USER_TO_ROOM,
    new AddUserToRoomEventStrategy()
  );
};

export default initializeSocketEvent;
