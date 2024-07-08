const SocketIO = require("socket.io");

module.exports = (server) => {
  const io = SocketIO(server, { path: "/socket.io" }); // io : 통신을 위한 소켓 장치
  io.on("connection", (socket) => {
    socket.on("chat message", (msg) => {
      io.emit("chat message", msg);
    });  // 상대가 나에게 chat message라는 주제로 io.emit을 했을 때 그것을 받았다면 나도 chat message를 emit함.
  }); // "connection"이 수립 되었을 때
};