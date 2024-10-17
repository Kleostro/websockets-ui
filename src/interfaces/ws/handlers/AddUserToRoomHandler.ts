import UserService from "../../../app/services/UserService";
import { WS_MESSAGE_TYPE, WSMessageType } from "../../../constants/wsMessage";
import SocketEventFactory from "../factories/SocketEvent";
import WebSocket from "ws";
import BaseHandler from "./BaseHandler";
import { logger } from "../../../utils/logger";
import { COLORS } from "../../../constants/logger";
import UserSocketStore from "../services/UserSocketStore";
import RoomService from "../../../app/services/RoomService";
import GameService from "../../../app/services/GameService";

class AddUserToRoomHandler extends BaseHandler {
  handle(
    data: { type: WSMessageType; data: string; id: number },
    socket: WebSocket
  ) {
    logger("RegHandler", COLORS.blue);

    const parsedData = JSON.parse(data.data);
    const room = RoomService.getInstance().getRoom(parsedData.indexRoom);
    logger(`Room: ${room?.id}`, COLORS.green);

    const userId = UserSocketStore.getInstance().getUserIdBySocket(socket);
    const user = UserService.getInstance().getUser(userId!);
    logger(`Finded user with name: ${user?.name}`, COLORS.green);

    if (room && user) {
      room.addPlayer(user);
      logger(`User added to room: ${room?.id}`, COLORS.green);

      if (room.isFull()) {
        const game = GameService.getInstance().createGame(
          room.players[0],
          room.players[1]
        );
        logger(`Game created with id: ${game.id}`, COLORS.green);

        room.players.forEach((player) => {
          const playerSocket = UserSocketStore.getInstance().get(player.id);
          if (playerSocket) {
            SocketEventFactory.emit(WS_MESSAGE_TYPE.CREATE_GAME)
              .for(playerSocket)
              .withPayload({
                idGame: game.id,
                idPlayer: player.id,
              })
              .emit();
          }
        });
      }
    }

    const allSockets = UserSocketStore.getInstance().getSockets();
    const availableRooms = RoomService.getInstance().getAvailableRooms();
    logger(`Count of available rooms: ${availableRooms.length}`, COLORS.green);

    allSockets.forEach((socket) => {
      SocketEventFactory.emit(WS_MESSAGE_TYPE.UPDATE_ROOM)
        .for(socket)
        .withPayload(availableRooms)
        .emit();
    });
  }
}

export default AddUserToRoomHandler;
