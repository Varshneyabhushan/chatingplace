const express = require('express')
const app = express()
const socket = require('socket.io')
var count = 0

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
    count += 1
    console.log("new connection recieved!!")
    io.sockets.emit('status',{message : 'new member has joined the chat!_________Members online:'+count, color : 'green'})
    
    socket.on('postmessage',function(res){
        socket.broadcast.emit('message',res)
    })

    socket.on('typing',function(){
        io.sockets.emit('typing',null)
    })

    socket.on('disconnect',function(){
        count -= 1
        socket.broadcast.emit('status',{message : 'someone has disconnected_________Members online:'+count, color : 'red'})
    })
})