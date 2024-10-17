import User from "../../models/User";

class WinnerService {
  static instance: WinnerService;
  private winners: Map<string, User>;

  private constructor() {
    this.winners = new Map();
  }

  static getInstance(): WinnerService {
    if (!WinnerService.instance) {
      WinnerService.instance = new WinnerService();
    }
    return WinnerService.instance;
  }

  addWinner(user: User): void {
    this.winners.set(user.id, user);
  }

  getWinners(): { name: string; wins: number }[] {
    return Array.from(this.winners.values())
      .map((user) => ({ name: user.name, wins: user.wins }))
      .sort((a, b) => b.wins - a.wins);
  }
}

export default WinnerService;
