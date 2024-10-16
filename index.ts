import { WebSocketServer } from "ws";
import { httpServer } from "./src/server";
import dotenv from "dotenv";
import initializeSocketEvent from "./src/app/initializeSocketEvent";
import UserSocketStore from "./src/interfaces/ws/services/UserSocketStore";
import SocketService from "./src/interfaces/ws/services/Socket";
import { logger } from "./src/utils/logger";
import { COLORS } from "./src/constants/logger";
import UserService from "./src/app/services/UserService";
import RoomService from "./src/app/services/RoomService";
dotenv.config();

const HTTP_PORT = Number(process.env.HTTP_PORT) || 8181;
const WS_PORT = Number(process.env.WS_PORT) || 3000;

logger("Start static http server on the 8181 port!", COLORS.magenta);
httpServer.listen(HTTP_PORT, () => {
  logger(`Server is running on http://localhost:${HTTP_PORT}`, COLORS.magenta);
});

logger(`Start WS server on the ${WS_PORT} port!`, COLORS.magenta);
const wsServer = new WebSocketServer({ port: WS_PORT });
initializeSocketEvent();

const userSocketStore = new UserSocketStore();
const userService = new UserService();
const roomService = new RoomService();
const socketService = new SocketService();

wsServer.on("connection", (socket) => {
  socket.on("message", (message) => {
    socketService.handle(message, socket);
  });
});
