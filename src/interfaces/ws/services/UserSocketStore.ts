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

  set(id: string, socket: WebSocket) {
    this.userSockets.set(id, socket);
  }

  get(id: string) {
    return this.userSockets.get(id);
  }

  getUserIdBySocket(socket: WebSocket) {
    return Array.from(this.userSockets.entries()).find(
      ([_, s]) => s === socket
    )?.[0];
  }

  delete(id: string) {
    this.userSockets.delete(id);
  }

  has(id: string) {
    return this.userSockets.has(id);
  }

  getKeys() {
    return Array.from(this.userSockets.keys());
  }

  getSockets() {
    return Array.from(this.userSockets.values());
  }
}

export default UserSocketStore;
