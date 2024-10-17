import Ship from "./Ship";
import User from "./User";

class Game {
  id: string;
  players: { [key: string]: User };
  ships: { [key: string]: Ship[] };
  currentPlayer: string;
  board: { [key: string]: string[][] };

  constructor(player1: User, player2: User) {
    this.id = crypto.randomUUID();
    this.players = {
      [player1.id]: player1,
      [player2.id]: player2,
    };
    this.ships = {
      [player1.id]: [],
      [player2.id]: [],
    };
    this.currentPlayer = player1.id;
    this.board = {
      [player1.id]: this.createEmptyBoard(),
      [player2.id]: this.createEmptyBoard(),
    };
  }

  private createEmptyBoard(): string[][] {
    return Array(10)
      .fill(null)
      .map(() => Array(10).fill("empty"));
  }

  addShip(playerId: string, ship: Ship) {
    this.ships[playerId].push(ship);
  }
}

export default Game;
