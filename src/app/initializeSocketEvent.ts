import { WS_MESSAGE_TYPE } from "../constants/wsMessage";
import SocketEventFactory from "../interfaces/ws/factories/SocketEvent";
import RegEventStrategy from "../interfaces/ws/strategies/RegEvent";
import UpdateRoomEventStrategy from "../interfaces/ws/strategies/UpdateRoomEvent";
import AddUserToRoomEventStrategy from "../interfaces/ws/strategies/AddUserToRoomEvent";
import CreateGameEventStrategy from "../interfaces/ws/strategies/CreateGameEvent";

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

  SocketEventFactory.registerStrategy(
    WS_MESSAGE_TYPE.CREATE_GAME,
    new CreateGameEventStrategy()
  );
};

export default initializeSocketEvent;
