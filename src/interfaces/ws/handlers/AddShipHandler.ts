import WebSocket from "ws";
import BaseHandler from "./BaseHandler";
import { WS_MESSAGE_TYPE, WSMessageType } from "../../../constants/wsMessage";
import GameService from "../../../app/services/GameService";
import Ship from "../../../models/Ship";
import { COLORS } from "../../../constants/logger";
import { logger } from "../../../utils/logger";
import UserSocketStore from "../services/UserSocketStore";
import SocketEventFactory from "../factories/SocketEvent";

class AddShipHandler extends BaseHandler {
  handle(
    data: { type: WSMessageType; data: string; id: number },
    socket: WebSocket
  ) {
    logger("AddShipHandler", COLORS.blue);

    const { gameId, indexPlayer, ships } = JSON.parse(data.data);
    const game = GameService.getInstance().getGame(gameId)!;

    const createdShips = ships.map(
      (ship: Ship) =>
        new Ship(ship.position, ship.direction, ship.type, ship.length)
    );
    logger(`Created ships count: ${createdShips.length}`, COLORS.green);

    game.addShips(indexPlayer, createdShips);
    logger(`All ships added to player: ${indexPlayer}`, COLORS.green);

    if (game.areAllPlayersReady()) {
      const startingPlayer = game.startGame();
      logger(`Starting player: ${startingPlayer}`, COLORS.green);

      Object.keys(game.players).forEach((playerId) => {
        const playerSocket = UserSocketStore.getInstance().get(playerId);
        console.log(`Starting game for player: ${playerId}`);
        console.log(`Starting player: ${startingPlayer}`);
        if (playerSocket) {
          SocketEventFactory.emit(WS_MESSAGE_TYPE.START_GAME)
            .for(playerSocket)
            .withPayload({
              ships: game.getPlayerShips(playerId),
              currentPlayerIndex: startingPlayer,
            })
            .emit();
        }

        const currentPlayerSocket =
          UserSocketStore.getInstance().get(startingPlayer);
        if (currentPlayerSocket) {
          SocketEventFactory.emit(WS_MESSAGE_TYPE.TURN)
            .for(currentPlayerSocket)
            .withPayload({ currentPlayer: startingPlayer })
            .emit();
        }
      });
    }

    logger(
      `Added ships count: ${createdShips.length} to player: ${indexPlayer}`,
      COLORS.green
    );
  }
}

export default AddShipHandler;
