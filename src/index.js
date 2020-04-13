const path = require('path')
const http = require('http')

const express = require('express')
const socketio = require('socket.io')

let publicPath = path.join(__dirname , '../public')

let app = express()
let server = http.createServer(app)
let io = socketio(server)
app.use(express.static(publicPath))

io.on('connection' , () => {
    console.log(`new connection`);
    
})

let port = process.env.PORT || 3000

server.listen(port , () => {
    console.log(`server is running on port ${port}`);
    
})