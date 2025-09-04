import { WebSocketServer, WebSocket as WSWebSocket, type RawData } from "ws";

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

wss.on("connection", (socket: WSWebSocket) => {
  console.log("Client connected");

  socket.on("message", (raw: RawData) => {
    const data = JSON.parse(raw.toString());
    switch (data.type) {
      case "orderbook": {
        console.log("Client requested orderbook updates");
        break;
      }
      default: {
        console.warn("Unknown message:", data.type);
        break;
      }
    }
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });

  socket.on("error", (err) => {
    console.error("Socket error:", err);
  });
});

wss.on("listening", () => {
  console.log(`WebSocket server listening on ws://localhost:${PORT}`);
});

wss.on("error", (err) => {
  console.error("WebSocket server error:", err);
});
