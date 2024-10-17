import WebSocket from "ws";
import BaseHandler from "./BaseHandler";
import UserSocketStore from "../services/UserSocketStore";
import SocketEventFactory from "../factories/SocketEvent";
import { WS_MESSAGE_TYPE, WSMessageType } from "../../../constants/wsMessage";
import GameService from "../../../app/services/GameService";
import { AttackStatusType } from "../../../constants/attack";
import WinnerService from "../../../app/services/WinnerService";

class AttackHandler extends BaseHandler {
  handle(
    data: { type: WSMessageType; data: string; id: number },
    socket: WebSocket
  ) {
    const { gameId, x, y, indexPlayer } = JSON.parse(data.data);

    const game = GameService.getInstance().getGame(gameId)!;

    const result = game.attack(indexPlayer, x, y);
    if (result) {
      this.broadcastAttackResult(gameId, indexPlayer, x, y, result);
      this.broadcastTurn(gameId);
      this.checkGameOver(gameId);
    }
  }

  private broadcastAttackResult(
    gameId: string,
    playerId: string,
    x: number,
    y: number,
    status: AttackStatusType
  ): void {
    const game = GameService.getInstance().getGame(gameId);
    if (game) {
      Object.keys(game.players).forEach((pid) => {
        const playerSocket = UserSocketStore.getInstance().get(pid);
        if (playerSocket) {
          SocketEventFactory.emit(WS_MESSAGE_TYPE.ATTACK)
            .for(playerSocket)
            .withPayload({
              position: { x, y },
              currentPlayer: playerId,
              status,
            })
            .emit();
        }
      });
    }
  }

  private broadcastTurn(gameId: string): void {
    const game = GameService.getInstance().getGame(gameId);
    if (game) {
      const playerSocket = UserSocketStore.getInstance().get(
        game.currentPlayer
      );
      if (playerSocket) {
        SocketEventFactory.emit(WS_MESSAGE_TYPE.TURN)
          .for(playerSocket)
          .withPayload({ currentPlayer: game.currentPlayer })
          .emit();
      }
    }
  }

  private checkGameOver(gameId: string): void {
    const gameService = GameService.getInstance();
    if (gameService.isGameOver(gameId)) {
      const winPlayer = gameService.getWinnerPlayerId(gameId);
      const game = gameService.getGame(gameId);
      if (game) {
        Object.keys(game.players).forEach((pid) => {
          const playerSocket = UserSocketStore.getInstance().get(pid);
          if (playerSocket) {
            SocketEventFactory.emit(WS_MESSAGE_TYPE.FINISH)
              .for(playerSocket)
              .withPayload({ winPlayer })
              .emit();
          }
        });

        gameService.finishGame(gameId);
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
  }
}

export default AttackHandler;
