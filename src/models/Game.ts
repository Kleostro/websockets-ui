import Ship from "./Ship";
import User from "./User";

class Game {
  id: string;
  players: { [key: string]: User };
  ships: { [key: string]: Ship[] };
  currentPlayer: string;
  board: { [key: string]: string[][] };
  isReady: { [key: string]: boolean };

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
    this.isReady = {
      [player1.id]: false,
      [player2.id]: false,
    };
  }

  private createEmptyBoard(): string[][] {
    return Array(10)
      .fill(null)
      .map(() => Array(10).fill("empty"));
  }

  addShips(playerId: string, ships: Ship[]) {
    this.ships[playerId] = ships;
    this.isReady[playerId] = true;
  }

  areAllPlayersReady(): boolean {
    return Object.values(this.isReady).every((ready) => ready);
  }

  getPlayerShips(playerId: string): Ship[] {
    return this.ships[playerId];
  }

  startGame(): string {
    const playerIds = Object.keys(this.players);
    this.currentPlayer =
      playerIds[Math.floor(Math.random() * playerIds.length)];
    return this.currentPlayer;
  }
}

export default Game;
