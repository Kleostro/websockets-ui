import { WebSocket } from "ws";

class UserSocketStore {
  private userSockets: Map<string, WebSocket>;
  static userSocketStore: UserSocketStore;
  constructor() {
    this.userSockets = new Map();
  }

  static getInstance() {
    if (!UserSocketStore.userSocketStore) {
      UserSocketStore.userSocketStore = new UserSocketStore();
    }

    return UserSocketStore.userSocketStore;
  }

  set(name: string, socket: WebSocket) {
    this.userSockets.set(name, socket);
  }

  get(name: string) {
    return this.userSockets.get(name);
  }

  getUserIdBySocket(socket: WebSocket) {
    return Array.from(this.userSockets.entries()).find(
      ([_, s]) => s === socket
    )?.[0];
  }

  delete(name: string) {
    this.userSockets.delete(name);
  }

  has(name: string) {
    return this.userSockets.has(name);
  }

  getKeys() {
    return Array.from(this.userSockets.keys());
  }

  getSockets() {
    return Array.from(this.userSockets.values());
  }
}

export default UserSocketStore;
