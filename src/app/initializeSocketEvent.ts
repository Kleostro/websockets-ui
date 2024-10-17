import { WS_MESSAGE_TYPE } from "../constants/wsMessage";
import SocketEventFactory from "../interfaces/ws/factories/SocketEvent";
import RegEventStrategy from "../interfaces/ws/strategies/RegEvent";
import UpdateRoomEventStrategy from "../interfaces/ws/strategies/UpdateRoomEvent";
import AddUserToRoomEventStrategy from "../interfaces/ws/strategies/AddUserToRoomEvent";
import CreateGameEventStrategy from "../interfaces/ws/strategies/CreateGameEvent";
import StartGameEventStrategy from "../interfaces/ws/strategies/StartGameEvent";
import TurnEventStrategy from "../interfaces/ws/strategies/TurnEvent";

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

  SocketEventFactory.registerStrategy(
    WS_MESSAGE_TYPE.START_GAME,
    new StartGameEventStrategy()
  );

  SocketEventFactory.registerStrategy(
    WS_MESSAGE_TYPE.TURN,
    new TurnEventStrategy()
  );
};

export default initializeSocketEvent;
