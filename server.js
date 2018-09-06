const express = require('express')
const app = express()
const socket = require('socket.io')


app.use(express.static('public'))
app.use(express.json())
const listener = app.listen(3000,"192.168.1.3",function(){
    console.log('app is listening on: localhost :'  +listener.address().port);
})

const io = socket(listener)

var count = 0

app.get('/',function(req,res){
    res.sendFile('public/room.html',{root : __dirname })
})

io.sockets.on('connection',function(socket){
    count += 1
    var clientIp = socket.request.connection.remoteAddress;
    console.log('New connection from ' + clientIp);
    socket.broadcast.emit('status',{message : 'new member has joined the chat!', color : 'green'})
    io.sockets.emit('changeCount',count)
    
    socket.on('postmessage',function(res){
        res.senderid = socket.id
        socket.broadcast.emit('message',res)
    })

    socket.on('typing',function(){
        io.sockets.emit('typing',null)
    })

    socket.on('disconnect',function(){
        count -= 1
        socket.broadcast.emit('status',{message : 'someone has disconnected', color : 'red'})
        io.sockets.emit('changeCount',count)
    })
})