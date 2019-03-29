


let users = {}

function handleConnection(io,socket){
    

    socket.on('userInfo',info=>{
        users[socket.id] = info
        io.sockets.emit('changeCount',Object.keys(users).length)

        socket.broadcast.emit('status',{
            message : `${info.given_name} has joined the chat!`,
            color : 'green'
        })

        for(let id in users){
            socket.emit('status',{
                message : `${users[id].given_name} has joined the chat!`,
                color : 'green'
            })
        }
        
    })
    
    socket.on('postmessage',function(res){
        if(!users[socket.id]) return 
        res.senderid = socket.id
        res.sender = users[socket.id].full_name
        socket.broadcast.emit('message',res)
    })
 
    socket.on('typing',function(){
        if(!users[socket.id]) return
        io.sockets.emit('typing',users[socket.id].given_name)
    })

    socket.on('disconnect',function(e){
        if(!users[socket.id]) return
        socket.broadcast.emit('status',{
            message : `${users[socket.id].given_name} has disconnected`,
            color : 'red'
        }) 
 
        delete users[socket.id]

        io.sockets.emit('changeCount',Object.keys(users).length)
    })
}

module.exports = handleConnection