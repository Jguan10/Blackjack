import { io } from "socket.io-client";

export default class SocketConnection {
  constructor() {
    this.socket = io("http://localhost:3000");
    this.socket.on("connect", this.connect);
  }
  connect() {
    console.log("connected");
  }
  removeConnectListener() {
    this.socket.off("connect", this.connect);
  }
}