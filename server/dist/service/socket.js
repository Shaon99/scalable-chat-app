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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const socket_io_1 = require("socket.io");
const ioredis_1 = __importDefault(require("ioredis"));
// Load environment variables from .env file
dotenv_1.default.config();
const pub = new ioredis_1.default({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    username: "",
    password: "",
});
const sub = new ioredis_1.default({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    username: "",
    password: "",
});
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
        sub.subscribe("chat");
    }
    //event listener for socket connection
    eventListener() {
        const io = this._io;
        console.log("initialize eventListener.....");
        io.on("connection", (socket) => {
            console.log("socket connected", socket.id);
            // Listen for 'event:message' from client
            socket.on("event:message", (_a) => __awaiter(this, [_a], void 0, function* ({ message, user, userId, imageUrl, }) {
                console.log(`Received message from ${user}:`, message);
                // Publish the message and user to Redis
                yield pub.publish("chat", JSON.stringify({ message, user, userId, imageUrl }));
            }));
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
exports.default = SocketService;
