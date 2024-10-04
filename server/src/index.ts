import http from "http";
import dotenv from "dotenv";
import SocketService from "./service/socket";

// Load environment variables from .env file
dotenv.config();

/**
 * Starts the HTTP server for the application.
 */
async function serverStart() {
  // Initialize SocketService for real-time communication
  const socketService = new SocketService();
  
  // Create and start an HTTP server to serve the static files and WebSocket server endpoint
  const httpServer = http.createServer();
  const PORT = process.env.PORT || 8000;

  //initialize socket server on httpServer
  socketService.io.attach(httpServer);

  httpServer.listen(PORT, () =>
    console.log(`HTTP server listening on port: ${PORT}`)
  );
}

serverStart();
