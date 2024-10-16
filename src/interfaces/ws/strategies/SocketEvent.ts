class SocketEventStrategy {
  constructor() {
    if (new.target === SocketEventStrategy) {
      throw new TypeError(
        "Cannot construct SocketEventStrategy instances directly"
      );
    }
  }

  createEvent(payload: unknown) {
    throw new Error("Method createEvent must be implemented");
  }
}

export default SocketEventStrategy;
