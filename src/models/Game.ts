import { ATTACK_STATUS, AttackStatusType } from "../constants/attack";
import Ship from "./Ship";
import User from "./User";

class Game {
  id: string;
  players: { [key: string]: User };
  ships: { [key: string]: Ship[] };
  currentPlayer: string;
  isReady: { [key: string]: boolean };
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
    this.isReady = {
      [player1.id]: false,
      [player2.id]: false,
    };
    this.board = {
      [player1.id]: Array(10)
        .fill(null)
        .map(() => Array(10).fill(null)),
      [player2.id]: Array(10)
        .fill(null)
        .map(() => Array(10).fill(null)),
    };
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

  attack(playerId: string, x: number, y: number): AttackStatusType | null {
    const opponentId = Object.keys(this.players).find((id) => id !== playerId)!;
    const cell = this.board[opponentId][y][x];

    if (
      cell === ATTACK_STATUS.MISS ||
      cell === ATTACK_STATUS.SHOT ||
      cell === ATTACK_STATUS.KILLED
    ) {
      return null;
    }

    const hitShip = this.ships[opponentId].find(
      (ship) =>
        (ship.direction &&
          ship.position.x === x &&
          ship.position.y <= y &&
          y < ship.position.y + ship.length) ||
        (!ship.direction &&
          ship.position.y === y &&
          ship.position.x <= x &&
          x < ship.position.x + ship.length)
    );

    if (hitShip) {
      this.board[opponentId][y][x] = ATTACK_STATUS.SHOT;
      hitShip.hits++;

      if (hitShip.hits === hitShip.length) {
        this.markKilledShip(opponentId, hitShip);
        return ATTACK_STATUS.KILLED;
      }
      return ATTACK_STATUS.SHOT;
    } else {
      this.board[opponentId][y][x] = ATTACK_STATUS.MISS;
      this.currentPlayer = opponentId;
      return ATTACK_STATUS.MISS;
    }
  }

  private isShipKilled(playerId: string, ship: Ship): boolean {
    for (let i = 0; i < ship.length; i++) {
      const x = ship.direction ? ship.position.x : ship.position.x + i;
      const y = ship.direction ? ship.position.y + i : ship.position.y;
      if (this.board[playerId][y][x] !== ATTACK_STATUS.KILLED) {
        return false;
      }
    }
    return true;
  }

  private markKilledShip(playerId: string, ship: Ship): void {
    for (let i = 0; i < ship.length; i++) {
      const x = ship.direction ? ship.position.x : ship.position.x + i;
      const y = ship.direction ? ship.position.y + i : ship.position.y;
      this.board[playerId][y][x] = ATTACK_STATUS.KILLED;
    }
    this.markAdjacentCells(playerId, ship);
  }

  private markAdjacentCells(playerId: string, ship: Ship): void {
    const startX = Math.max(0, ship.position.x - 1);
    const startY = Math.max(0, ship.position.y - 1);
    const endX = Math.min(
      9,
      ship.position.x + (ship.direction ? 0 : ship.length)
    );
    const endY = Math.min(
      9,
      ship.position.y + (ship.direction ? ship.length : 0)
    );

    for (let y = startY; y <= endY; y++) {
      for (let x = startX; x <= endX; x++) {
        if (this.board[playerId][y][x] === null) {
          this.board[playerId][y][x] = ATTACK_STATUS.MISS;
        }
      }
    }
  }

  isGameOver(): boolean {
    const result = Object.keys(this.players).some((playerId) =>
      this.isPlayerDefeated(playerId)
    );
    return result;
  }

  getWinner(): string | null {
    const winner = Object.keys(this.players).find(
      (playerId) => !this.isPlayerDefeated(playerId)
    );
    return winner || null;
  }

  private isPlayerDefeated(playerId: string): boolean {
    const result = this.ships[playerId].every((ship) =>
      this.isShipKilled(playerId, ship)
    );
    return result;
  }

  getWinnerPlayerId(): string | null {
    const winner = Object.keys(this.players).find(
      (playerId) => !this.isPlayerDefeated(playerId)
    );
    return winner || null;
  }
}

export default Game;
