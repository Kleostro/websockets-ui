import UserService from "../../../app/services/UserService";
import { WS_MESSAGE_TYPE, WSMessageType } from "../../../constants/wsMessage";
import SocketEventFactory from "../factories/SocketEvent";
import WebSocket from "ws";
import BaseHandler from "./BaseHandler";
import { logger } from "../../../utils/logger";
import { COLORS } from "../../../constants/logger";
import UserSocketStore from "../services/UserSocketStore";
import User from "../../../models/User";
import RoomService from "../../../app/services/RoomService";
import WinnerService from "../../../app/services/WinnerService";

class RegHandler extends BaseHandler {
  private userSocketStore = UserSocketStore.getInstance();
  handle(
    data: { type: WSMessageType; data: string; id: number },
    socket: WebSocket
  ) {
    logger("RegHandler", COLORS.blue);

    const parsedData = JSON.parse(data.data);

    const user = UserService.getInstance().createUser(
      parsedData.name,
      parsedData.password
    );

    if (user instanceof User) {
      this.userSocketStore.set(user.id, socket);
      WinnerService.getInstance().addWinner(user);
    }

    SocketEventFactory.emit(data.type).for(socket).withPayload(user).emit();

    const availableRooms = RoomService.getInstance().getAvailableRooms();
    logger(`Count of available rooms: ${availableRooms.length}`, COLORS.green);

    SocketEventFactory.emit(WS_MESSAGE_TYPE.UPDATE_ROOM)
      .for(socket)
      .withPayload(availableRooms)
      .emit();

    const winners = WinnerService.getInstance().getWinners();
    const allSockets = UserSocketStore.getInstance().getSockets();

    allSockets.forEach((socket) => {
      SocketEventFactory.emit(WS_MESSAGE_TYPE.UPDATE_WINNERS)
        .for(socket)
        .withPayload(winners)
        .emit();
    });
  }
}

export default RegHandler;
