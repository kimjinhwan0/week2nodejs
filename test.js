const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // 모든 클라이언트에게 메시지 전송
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

http.listen(3000, () => {
    console.log('Server is running on port 3000');
});