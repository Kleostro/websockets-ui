import { WebSocketServer } from "ws";
import { httpServer } from "./src/server";
import dotenv from "dotenv";

dotenv.config();

const HTTP_PORT = Number(process.env.HTTP_PORT) || 8181;
const WS_PORT = Number(process.env.WS_PORT) || 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT, () => {
  console.log(`Server is running on http://localhost:${HTTP_PORT}`);
});

console.log(`Start WS server on the ${WS_PORT} port!`);
const wsServer = new WebSocketServer({ port: WS_PORT });

wsServer.on("connection", (socket) => {
  console.log("New connection");
});
