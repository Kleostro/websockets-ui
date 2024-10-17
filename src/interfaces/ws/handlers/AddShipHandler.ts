import WebSocket from "ws";
import BaseHandler from "./BaseHandler";
import { WSMessageType } from "../../../constants/wsMessage";
import GameService from "../../../app/services/GameService";
import Ship from "../../../models/Ship";
import { COLORS } from "../../../constants/logger";
import { logger } from "../../../utils/logger";

class AddShipHandler extends BaseHandler {
  handle(
    data: { type: WSMessageType; data: string; id: number },
    socket: WebSocket
  ) {
    logger("AddShipHandler", COLORS.blue);

    const { gameId, indexPlayer, ships } = JSON.parse(data.data);
    const game = GameService.getInstance().getGame(gameId)!;
    const player = game.players[indexPlayer];
    logger(`Found player with name: ${player.name}`, COLORS.green);

    const createdShips = ships.map(
      (ship: Ship) =>
        new Ship(ship.position, ship.direction, ship.type, ship.length)
    );
    logger(`Created ships count: ${createdShips.length}`, COLORS.green);

    createdShips.forEach((ship: Ship) => {
      game.addShip(player.id, ship);
      logger(`Created ship with id: ${ship.id}`, COLORS.green);
    });

    logger(
      `Added ships count: ${createdShips.length} to player: ${player.id}`,
      COLORS.green
    );
  }
}

export default AddShipHandler;
