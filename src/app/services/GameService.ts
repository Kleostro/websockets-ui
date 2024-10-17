import Game from "../../models/Game";
import User from "../../models/User";

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
}

export default GameService;
