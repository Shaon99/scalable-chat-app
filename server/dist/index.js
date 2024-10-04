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
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const socket_1 = __importDefault(require("./service/socket"));
// Load environment variables from .env file
dotenv_1.default.config();
/**
 * Starts the HTTP server for the application.
 */
function serverStart() {
    return __awaiter(this, void 0, void 0, function* () {
        // Initialize SocketService for real-time communication
        const socketService = new socket_1.default();
        // Create and start an HTTP server to serve the static files and WebSocket server endpoint
        const httpServer = http_1.default.createServer();
        const PORT = process.env.PORT || 8000;
        //initialize socket server on httpServer
        socketService.io.attach(httpServer);
        httpServer.listen(PORT, () => console.log(`HTTP server listening on port: ${PORT}`));
    });
}
serverStart();
