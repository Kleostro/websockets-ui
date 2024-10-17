import { ATTACK_STATUS, AttackStatusType } from "../../constants/attack";
import Game from "../../models/Game";
import User from "../../models/User";
import WinnerService from "./WinnerService";

class GameService {
  private games: Game[];
  static gameService: GameService;

  constructor() {
    this.games = [];
  }

  static getInstance(): GameService {
    if (!GameService.gameService) {
      GameService.gameService = new GameService();
    }
    return GameService.gameService;
  }

  public createGame(player1: User, player2: User): Game {
    const game = new Game(player1, player2);
    this.games.push(game);
    return game;
  }

  public getGame(id: string): Game | undefined {
    return this.games.find((game) => game.id === id);
  }

  attack(
    gameId: string,
    playerId: string,
    x: number,
    y: number
  ): AttackStatusType | null {
    const game = this.games.find((game) => game.id === gameId);
    if (game && game.currentPlayer === playerId) {
      const result = game.attack(playerId, x, y);
      if (result === ATTACK_STATUS.MISS) {
        game.currentPlayer = this.getOpponentId(game, playerId);
      }
      return result;
    }
    return null;
  }

  randomAttack(
    gameId: string,
    playerId: string
  ): { x: number; y: number; status: AttackStatusType } | null {
    const game = this.games.find((game) => game.id === gameId);
    if (game && game.currentPlayer === playerId) {
      let x: number, y: number, status: AttackStatusType | null;
      do {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
        status = game.attack(playerId, x, y);
      } while (status === null);

      if (status === ATTACK_STATUS.MISS) {
        game.currentPlayer = this.getOpponentId(game, playerId);
      }
      return { x, y, status };
    }
    return null;
  }

  private getOpponentId(game: Game, playerId: string): string {
    return Object.keys(game.players).find((id) => id !== playerId) || "";
  }

  public isGameOver(gameId: string): boolean {
    const game = this.getGame(gameId);
    return game ? game.isGameOver() : false;
  }

  public getWinner(gameId: string): string | null {
    const game = this.getGame(gameId);
    return game ? game.getWinner() : null;
  }

  public getWinnerPlayerId(gameId: string): string | null {
    const game = this.getGame(gameId);
    return game ? game.getWinnerPlayerId() : null;
  }

  public finishGame(gameId: string): void {
    const game = this.getGame(gameId);
    if (game && game.isGameOver()) {
      const winnerId = game.getWinnerPlayerId();
      if (winnerId) {
        const winner = game.players[winnerId];
        winner.incrementWins();
        WinnerService.getInstance().addWinner(winner);
      }
      this.games = this.games.filter((g) => g.id !== gameId);
    }
  }
}

export default GameService;
