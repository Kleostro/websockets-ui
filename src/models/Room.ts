import User from "./User";

class Room {
  id: string;
  players: User[];

  constructor() {
    this.id = crypto.randomUUID();
    this.players = [];
  }

  addPlayer(player: User) {
    if (this.players.length < 2) {
      this.players.push(player);
    }
  }

  isFull() {
    return this.players.length === 2;
  }
}

export default Room;
