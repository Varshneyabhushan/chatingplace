const express = require('express')
const app = express()
const socket = require('socket.io')


const listener = app.listen(3000 ,'localhost',function(){
    console.log('app is listening on: localhost :'  +listener.address().port);
})

const io = socket(listener)

app.use(express.static('public'))
app.use(express.json())

app.get('/',function(req,res){
    res.sendFile('public/room.html',{root : __dirname })
})

app.post('/postMessage',function(req,res){
    var msg = req.body
    console.log(msg)
    res.send("successful!")
})

io.sockets.on('connection',function(socket){
    console.log("new connection recieved!!")
    socket.broadcast.emit('status','new member has joined the chat!')
    
    socket.on('postmessage',function(res){
        socket.broadcast.emit('message',res)
    })

    socket.on('typing',function(message){
        io.sockets.emit('typing',null)
    })
})