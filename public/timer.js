
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

const timer = new Timer(1000)

if(navigator.serviceWorker)
    navigator.serviceWorker.register('/serviceWorker.js')
    .then(_=>console.log('registerd'))