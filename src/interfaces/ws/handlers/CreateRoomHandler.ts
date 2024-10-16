import WebSocket from "ws";
import { WS_MESSAGE_TYPE, WSMessageType } from "../../../constants/wsMessage";
import BaseHandler from "./BaseHandler";
import { logger } from "../../../utils/logger";
import { COLORS } from "../../../constants/logger";
import SocketEventFactory from "../factories/SocketEvent";
import RoomService from "../../../app/services/RoomService";
import UserSocketStore from "../services/UserSocketStore";
import UserService from "../../../app/services/UserService";

class CreateRoomHandler extends BaseHandler {
  private userSocketStore = UserSocketStore.getInstance();

  handle(
    data: { type: WSMessageType; data: string; id: number },
    socket: WebSocket
  ) {
    logger("CreateRoomHandler", COLORS.blue);

    const userId = this.userSocketStore.getUserIdBySocket(socket);
    const user = UserService.getInstance().getUser(userId!);

    const room = RoomService.getInstance().createRoom();

    logger(`Room created: ${room.id}`, COLORS.green);
    room.addPlayer(user!);

    logger(`User ${user!.id} added to room ${room.id}`, COLORS.green);

    const availableRooms = RoomService.getInstance().updateAvailableRooms();

    logger(`Count of available rooms: ${availableRooms.length}`, COLORS.green);

    const allSockets = this.userSocketStore.getSockets();

    allSockets.forEach((socket) => {
      SocketEventFactory.emit(WS_MESSAGE_TYPE.UPDATE_ROOM)
        .for(socket)
        .withPayload(availableRooms)
        .emit();
    });
  }
}

export default CreateRoomHandler;
