"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
class SocketService {
    constructor() {
        console.log("server initialized....");
        this._io = new socket_io_1.Server();
    }
    //getter methods for socket
    get io() {
        return this._io;
    }
}
exports.default = SocketService;
