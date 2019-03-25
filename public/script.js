

const username = document.getElementById("name")
const messagebox = document.getElementById("textbox")
const countdeck = document.getElementById('count')

var lastSender = null
var lastMessage = null
var myid = 0

messagebox.addEventListener("keyup", function(event) {
    event.preventDefault()
    if (event.keyCode === 13){
        let text = textbox.value
        if(text.indexOf("change:") == 0){
            let name = text.replace("change:","")
            username.innerText = name
            stickMessage({message : `you change your screen_name to : ${name}`, color : 'yellow'})
            textbox.value = ""
        }else{
            send()
        }
    }
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
socket.on('changeCount',x=> countdeck.innerText = `members Online : ${x}`)

function send(){
    if(username.innerText == "") username.innerText = "anonymous"
    var msg = { "sender" : username.innerText, "message" : messagebox.value , "senderid" : myid }
    appendMessage(msg)
    socket.emit('postmessage',msg)
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
        chat.scrollTop = chat.scrollHeight
        
        lastMessage = msgobj
        lastSender = msg.senderid
    }
}

function stickMessage({message ,color}){
    var msge = document.createElement('p')
    msge.className = color
    msge.innerText = message
    chat.appendChild(msge)
    chat.scrollTop = chat.scrollHeight
}