var sendbtn = document.getElementById("send")
const username = document.getElementById("id")
const messagebox = document.getElementById("textbox")


sendbtn.addEventListener('click',function(){
    var msg = { "sender" : username.value,"message" : messagebox.value }
    appendMessage(msg)
    postMessage(msg)
})


const socket = io.connect('http://localhost:3000')


socket.on('message',function(message){
    appendMessage(message)
})

socket.on('status',function(message){
    stickMessage(message)
})

function appendMessage(msg){
    var msgobj = document.createElement('div')
    msgobj.className = "msgobj"
    var sender = document.createElement('p')
    sender.className = "sender"
    sender.innerText = msg.sender + ":"
    var message = document.createElement("p")
    message.className = "message"
    message.innerText = msg.message
    msgobj.appendChild(sender)
    msgobj.appendChild(message)
    document.getElementById("chat").appendChild(msgobj)
}

function postMessage(msg){
    socket.emit('postmessage',msg)
}

function stickMessage(msg){
    var msge = document.createElement('p')
    msge.className = "sticks"
    msge.innerText = msg
    document.getElementById("chat").appendChild(msge)
}


messagebox.onkeydown = function(){
    
}