

const messagebox = document.getElementById("textbox")
const countdeck = document.getElementById('count')

const badge = document.createElement('p')
const chat = document.getElementById('chat')
const chatcon = document.getElementById('chatcon')

badge.id = "badge"
badge.className = "typingbadge"
badge.innerText = "some is typing...." 

const timer = new Timer(1000,chat,badge)

var lastSender = null
var lastMessage = null
var myid = 0

messagebox.addEventListener("keyup", function(event) {
    event.preventDefault()
    if (event.keyCode === 13) send()
});

messagebox.onkeydown = function(event){
    if(event.keyCode != 13) socket.emit('typing')
}

let socket = io()

socket.on('connect',function(){
    myid = socket.id
    stickMessage({ message : 'you joined the chat!', color : 'green' })
})  

socket.on('message',appendMessage)
socket.on('status',stickMessage)
socket.on('typing',_=>timer.reset())
socket.on('changeCount',x=> countdeck.innerText = `online : ${x}`)
socket.on('disconnect',_=>{
    countdeck.innerText = ``
    stickMessage({ message : 'you are offline.' , color : 'red' })
})

function send(){
    var msg = { "sender" : username , "message" : messagebox.value.trim() , "senderid" : myid }
    if(msg.message != ""){
        appendMessage(msg)
        socket.emit('postmessage',msg)
    }
    messagebox.value = ""
}

function appendMessage(msg){

    if(msg.senderid == lastSender){
        lastMessage.getElementsByClassName("message")[0].innerText += "\n" + msg.message
    }else{
        let msgobj = document.createElement('div')
        msgobj.className = `msgobj ${(msg.senderid == myid) ? "me" : "you"}`
        msgobj.innerHTML = `
            <p class="sender">${msg.sender}:</p>
            <p class="message">${msg.message}</p>
        `

        chat.appendChild(msgobj)
        
        
        lastMessage = msgobj
        lastSender = msg.senderid
    }

    chatcon.scrollTop = chatcon.scrollHeight

}

function stickMessage({message ,color}){
    var msge = document.createElement('p')
    msge.className = color
    msge.innerText = message
    chat.appendChild(msge)
    chatcon.scrollTop = chatcon.scrollHeight
}