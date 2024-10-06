import dotenv from "dotenv";
import { Server } from "socket.io";
import Redis from "ioredis";

// Load environment variables from .env file
dotenv.config();

const pub = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  username: "",
  password: "",
});

const sub = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  username: "",
  password: "",
});

//socket service
class SocketService {
  private _io: Server;
  //constructor to initialize server
  constructor() {
    console.log("server initialized....");
    this._io = new Server({
      cors: {
        origin: "*",
        allowedHeaders: ["*"],
      },
    });
    sub.subscribe("chat");
  }

  //event listener for socket connection
  public eventListener() {
    const io = this._io;
    console.log("initialize eventListener.....");

    io.on("connection", (socket) => {
      console.log("socket connected", socket.id);

      // Listen for 'event:message' from client
      socket.on(
        "event:message",
        async ({
          message,
          user,
          userId,
          imageUrl,
        }: {
          message: string;
          user: string;
          userId: string;
          imageUrl: string;
        }) => {
          console.log(`Received message from ${user}:`, message);

          // Publish the message and user to Redis
          await pub.publish(
            "chat",
            JSON.stringify({ message, user, userId, imageUrl })
          );
        }
      );
    });

    // Subscribe to Redis and emit message to all clients
    sub.on("message", (channel, message) => {
      if (channel === "chat") {
        console.log("Received message from redis:", message);

        // Emit the message to all connected clients
        io.emit("message", message); // This will send the original message to all clients
      }
    });
  }

  //getter methods for socket
  get io() {
    return this._io;
  }
}

export default SocketService;
