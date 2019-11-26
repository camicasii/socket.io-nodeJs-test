const express = require('express');
const morgan = require('morgan');
const path =  require('path');
const SocketIO = require("socket.io");

const app = express();

//SocketIO.listen(server);


app.set('port', process.env.PORT||3000);

app.use(morgan('dev'));



app.use(express.static(path.join(__dirname, "/public")));


const server = app.listen(app.get('port'),()=>console.log("server init on port ",app.get('port')));

const io = SocketIO(server);

//webSocket
io.on("connection",(socket)=>{
    //listener event
    socket.on('chat:message',(data)=>{
        //emit event
        io.sockets.emit('chat:message',data)
    })
    //listener event
    socket.on('chat:tipying',(data)=>{
        //emit event all socket, except to the socket emit
        socket.broadcast.emit("chat:tipying",data)
        // emit an event to the socket
        socket.emit('user',data)
    })
})

