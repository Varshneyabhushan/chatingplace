var sendbtn = document.getElementById("send")
const username = document.getElementById("name")
const messagebox = document.getElementById("textbox")
const badge = document.createElement('p')
const chat = document.getElementById('chat')
badge.id = "badge"
badge.className = "typingbadge"
badge.innerText = "some is typing...."
const countdeck = document.getElementById('count')

var lastSender = null
var lastMessage = null
var myid = 0

function Timer(val){
    var interval
    var started = false

    this.start = function(){
        chat.appendChild(badge)
        chat.scrollTop = chat.scrollHeight
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

const timer = new Timer(700)

messagebox.addEventListener("keyup", function(event) {
    event.preventDefault()
    if (event.keyCode === 13){
        var text = textbox.value
        if(text.indexOf("change:") == 0){
            var name = text.replace("change:","")
            username.innerText = name
            stickMessage("you change your screen_name to : "+name,'yellow')
            textbox.value = ""
        }else{
            send()
        }
    }
  });

var socket = io()

socket.on('connect',function(){
    myid = socket.id
})

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

socket.on('changeCount',function(count){
    countdeck.innerText = "members Online :" + count
})

function send(){
    if(username.innerText == "") username.innerText = "anonymous"
    var msg = { "sender" : username.innerText,"message" : messagebox.value }
    msg.senderid = myid
    appendMessage(msg)
    postMessage(msg)
    messagebox.value = ""
}

function appendMessage(msg){
    //console.log(msg)
    if(msg.senderid == lastSender){
        lastMessage.getElementsByClassName("message")[0].innerText += "\n" + msg.message
    }else{
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
        chat.scrollTop = chat.scrollHeight
        if(msg.senderid == myid) msgobj.className += " me"
        else msgobj.className += " you"
        lastMessage = msgobj
        lastSender = msg.senderid
    }
    
}

function postMessage(msg){
    socket.emit('postmessage',msg)
}

function stickMessage(msg,color){
    var msge = document.createElement('p')
    msge.className = color
    msge.innerText = msg
    chat.appendChild(msge)
    chat.scrollTop = chat.scrollHeight
}


messagebox.onkeydown = function(event){
    if(event.keyCode != 13) socket.emit('typing')
}