import { Server } from "socket.io";

class SocketService {
  private _io: Server;

  constructor() {
    console.log("server initialized....");
    this._io = new Server();
  }
  //getter methods for socket
  get io() {
    return this._io;
  }
}

export default SocketService;
