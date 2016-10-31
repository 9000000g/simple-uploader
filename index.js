const io = require('socket.io').listen(1992);
const ss = require('socket.io-stream');
const fs = require('fs');
io.on('connection', function(socket) {
    ss(socket).on('upload', function(stream, data) {
        let filename = `./uploads/${data.name}`;
        stream.pipe(fs.createWriteStream(filename));
    });
});
