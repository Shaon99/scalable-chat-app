"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
//socket service
class SocketService {
    //constructor to initialize server
    constructor() {
        console.log("server initialized....");
        this._io = new socket_io_1.Server({
            cors: {
                origin: "*",
                allowedHeaders: ["*"],
            },
        });
    }
    //event listener for socket connection
    eventListener() {
        const io = this._io;
        console.log("initialize eventListener.....");
        io.on("connection", (socket) => {
            console.log("socket connected", socket.id);
            socket.on("event:message", (_a) => __awaiter(this, [_a], void 0, function* ({ message }) {
                console.log("Received message:", message);
            }));
        });
    }
    //getter methods for socket
    get io() {
        return this._io;
    }
}
exports.default = SocketService;
