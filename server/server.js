const express = require('express')
const app = express()
const socket = require('socket.io')
const path = require('path')
const handleConnection = require('./connection.js')
const public = path.join(__dirname,'../public')

require('dotenv').config()

app.use(express.static(public))

app.use(express.json())

const listener = app.listen(process.env.PORT || 3000 , function(){
    let {family , address , port } = listener.address()
    console.log(`app is listening on: ${family}:${address}:${port}`);
})

const io = socket(listener)

app.get('/',function(req,res){
    res.sendFile('/home/room.html' , { root : public })
})

app.get('/login',function(req,res){
    res.sendFile('/login/login.html' , { root : public })
})

io.sockets.on('connection',socket=>handleConnection(io,socket))