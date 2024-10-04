import { Server } from "socket.io";
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
  }

  //event listener for socket connection
  public eventListener() {
    const io = this._io;
    console.log("initialize eventListener.....");
    io.on("connection", (socket) => {
      console.log("socket connected", socket.id);
      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("Received message:", message);
      });
    });
  }

  //getter methods for socket
  get io() {
    return this._io;
  }
}

export default SocketService;
