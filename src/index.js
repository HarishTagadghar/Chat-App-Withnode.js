const path = require('path')
const http = require('http')

const express = require('express')
const socketio = require('socket.io')

let publicPath = path.join(__dirname , '../public')

let app = express()
let server = http.createServer(app)
let io = socketio(server)
app.use(express.static(publicPath))

io.on('connection' , (socket) => {
    console.log(`new connection`);

    socket.emit('message' , 'Welcome!');

    socket.broadcast.emit('message','a new user joined the group')
    
    socket.on('sentmessage', (msg) => {
        io.emit('message' , msg)
    })

    socket.on('disconnect' , () => {
        io.emit('message' , 'a user left the group')
    })

})

let port = process.env.PORT || 3000

server.listen(port , () => {
    console.log(`server is running on port ${port}`);
    
})