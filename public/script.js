var sendbtn = document.getElementById("send")
const username = document.getElementById("id")
const messagebox = document.getElementById("textbox")
const badge = document.createElement('p')
const chat = document.getElementById('chat')
badge.id = "badge"
badge.className = "typingbadge"
badge.innerText = "some is typing...."


function Timer(val){
    var interval
    var started = false

    this.start = function(){
        chat.appendChild(badge)
        interval = setInterval(this.stop,val)
        started = true
    }

    this.stop = function(){
        clearInterval(interval)
        chat.removeChild(badge)
        started = false
    }

    this.reset = function(){
        if(started) this.stop()
        this.start()
    }
}

const timer = new Timer(1000)


sendbtn.addEventListener('click',function(){
    var msg = { "sender" : username.value,"message" : messagebox.value }
    appendMessage(msg)
    postMessage(msg)
})


const socket = io.connect('http://localhost:3000')

stickMessage('you joined the chat!','green')

socket.on('message',function(message){
    appendMessage(message)
})

socket.on('status',function(res){
    stickMessage(res.message,res.color)
})

socket.on('typing',function(){
    timer.reset()
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
    chat.appendChild(msgobj)
}

function postMessage(msg){
    socket.emit('postmessage',msg)
}

function stickMessage(msg,color){
    var msge = document.createElement('p')
    msge.className = color
    msge.innerText = msg
    chat.appendChild(msge)
}


messagebox.onkeydown = function(){
    socket.emit('typing',null)
}